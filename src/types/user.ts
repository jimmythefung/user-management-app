export interface User {
  id: number
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export interface NewUser {
  email: string
  name: string
} 