# User Management App

A modern, full-stack user management system built with Next.js, Prisma, SQLite, and TypeScript. Features include user CRUD operations, search, pagination, and comprehensive testing.

## 🚀 Features

- **User Management**: Create, read, update, and delete users
- **Search & Filter**: Search users by email or name
- **Pagination**: Navigate through large user lists efficiently
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Type Safety**: Full TypeScript support
- **Database**: SQLite with Prisma ORM
- **Testing**: Jest (unit/API tests) and Playwright (E2E tests)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Testing**: Jest, Playwright
- **Development**: ESLint, Turbopack

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd user-management-app
npm install
```

### 2. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
user-management-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/users/         # API routes
│   │   │   ├── route.ts       # GET/POST users
│   │   │   └── [id]/route.ts  # DELETE user
│   │   ├── page.tsx           # Main UI
│   │   └── layout.tsx         # Root layout
│   ├── lib/
│   │   └── prisma.ts          # Prisma client
│   └── types/
│       └── test-listen.d.ts   # Type declarations
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── tests/
│   └── user-management.spec.ts # Playwright E2E tests
├── public/                     # Static assets
└── package.json
```

## 🧪 Testing

### Jest Tests (Unit/API)

```bash
# Run all Jest tests
npm test

# Run specific test file
npm test -- src/app/api/users/route.test.ts
```

### Playwright Tests (E2E)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run with visible browser
npm run test:e2e:headed
```

### All Tests

```bash
# Run both Jest and Playwright tests
make test-all
```

## 🗄️ Database

### Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Reset database
npx prisma db push --force-reset

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test             # Run Jest tests
npm run test:e2e     # Run Playwright tests

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Linting
npm run lint         # Run ESLint
```

### Make Commands

```bash
make help            # Show all commands
make clean           # Clear npm cache and node_modules
make fresh           # Clean and reinstall everything
make reset           # Reset database and reinstall
make dev             # Start development server
make test            # Run Jest tests
make test-e2e        # Run Playwright tests
make test-all        # Run all tests
```

## 📡 API Endpoints

### GET /api/users
Get paginated users with search and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term for email or name

**Response:**
```json
{
  "users": [...],
  "total": 8,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### POST /api/users
Create a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "name": "User Name"
}
```

### DELETE /api/users/[id]
Delete a user by ID.

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Search**: Real-time search with debouncing
- **Pagination**: Navigate through user lists
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client and server-side validation

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error:**
```bash
npm run db:push
npm run db:seed
```

**Test Failures:**
```bash
make reset
npm test
```

**Build Errors:**
```bash
make clean
npm install
npm run build
```

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Prisma documentation](https://www.prisma.io/docs)
- Open an issue for bugs or feature requests
