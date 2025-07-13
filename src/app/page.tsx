'use client'

import { useState, useEffect } from 'react'
import { User, NewUser } from '../types/user'
import SearchAndAddSection from '../components/SearchAndAddSection'
import MessageDisplay from '../components/MessageDisplay'
import UsersContainer from '../components/UsersContainer'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  const itemsPerPage = 5

  // Fetch users with pagination
  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users?page=${page}&limit=${itemsPerPage}&search=${searchTerm}`)
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setTotalPages(Math.ceil(data.total / itemsPerPage))
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load users on component mount and when search changes
  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage, searchTerm])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1) // Reset to first page when searching
      fetchUsers(1)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleCreateUser = async (newUser: NewUser) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        setMessage('User created successfully!')
        fetchUsers(currentPage) // Refresh the list
      } else {
        const error = await response.json()
        setMessage(`Failed to create user: ${error.error}`)
      }
    } catch (error) {
      setMessage('Error creating user')
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMessage('User deleted successfully!')
        fetchUsers(currentPage) // Refresh the list
      } else {
        setMessage('Failed to delete user')
      }
    } catch (error) {
      setMessage('Error deleting user')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          User Management System
        </h1>
        
        <SearchAndAddSection 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddUser={handleCreateUser}
        />

        <MessageDisplay message={message} />

        <UsersContainer
          users={users}
          loading={loading}
          searchTerm={searchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          onDeleteUser={handleDeleteUser}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
