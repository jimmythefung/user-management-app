import { createServer } from 'http'
import listen from 'test-listen'
import fetch from 'node-fetch'
import { GET } from './route'
import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// Helper to wrap Next.js API route as a server
// Purpose:
//   - Creates a temporary HTTP server that wraps your Next.js API route so it can be tested with standard HTTP requests.
// What it does step by step:
//   - toServer(GET) - Wraps your Next.js API handler in a Node.js HTTP server
//   - listen(...) - Starts the server on a random available port
//   - await - Waits for the server to start and get the URL
//   - url = - Stores the server's URL (like http://localhost:12345)
// Why needed:
//   - Next.js API routes are functions, not HTTP servers
//   - HTTP testing libraries (like fetch) need actual HTTP endpoints
//   - test-listen creates a temporary server that can be tested with fetch
function toServer(apiHandler: typeof GET) {
  return createServer(async (req, res) => {
    // Create a proper NextRequest object
    const url = new URL(req.url || '/', `http://localhost`)
    const nextRequest = new NextRequest(url, {
      method: req.method || 'GET',
      headers: req.headers as any,
    })
    
    // Call the API handler
    const response = await apiHandler(nextRequest)
    
    // Write response back to the HTTP response
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()))
    const body = await response.text()
    res.end(body)
  })
}

describe('/api/users API', () => {
  let url: string
  let server: any

  beforeAll(async () => {
    // Seed the database before tests
    await prisma.user.deleteMany()
    await prisma.user.createMany({
      data: [
        { email: 'a@example.com', name: 'Alice' },
        { email: 'b@example.com', name: 'Bob' },
        { email: 'c@example.com', name: 'Carol' },
        { email: 'd@example.com', name: 'David' },
        { email: 'e@example.com', name: 'Eve' },
        { email: 'f@example.com', name: 'Frank' },
      ],
    })
    
    // Create and start the server
    server = toServer(GET)
    url = await listen(server)
  })

  afterAll(async () => {
    // Close the server
    if (server) {
      server.close()
    }
    await prisma.$disconnect()
  })

  it('returns paginated users', async () => {
    const res = await fetch(`${url}?page=1&limit=2`)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.users.length).toBe(2)
    expect(data.total).toBeGreaterThanOrEqual(6)
    expect(data.page).toBe(1)
    expect(data.limit).toBe(2)
    expect(data.totalPages).toBeGreaterThanOrEqual(3)
  })

  it('returns correct users for page 2', async () => {
    const res = await fetch(`${url}?page=2&limit=2`)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.users.length).toBe(2)
    expect(data.page).toBe(2)
  })

  it('searches users by name', async () => {
    const res = await fetch(`${url}?search=Alice`)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.users.some((u: any) => u.name === 'Alice')).toBe(true)
  })

  it('searches users by email', async () => {
    const res = await fetch(`${url}?search=b@example.com`)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.users.some((u: any) => u.email === 'b@example.com')).toBe(true)
  })

  it('returns empty array for no match', async () => {
    const res = await fetch(`${url}?search=notfound`)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.users.length).toBe(0)
  })
}) 