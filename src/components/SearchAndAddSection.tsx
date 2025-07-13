'use client'

import { useState } from 'react'
import UserSearch from './UserSearch'
import AddUserForm from './AddUserForm'
import { NewUser } from '../types/user'

interface SearchAndAddSectionProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onAddUser: (user: NewUser) => void
}

export default function SearchAndAddSection({ 
  searchTerm, 
  onSearchChange, 
  onAddUser 
}: SearchAndAddSectionProps) {
  const [showForm, setShowForm] = useState(false)

  const handleAddUser = (user: NewUser) => {
    onAddUser(user)
    setShowForm(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <UserSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <AddUserForm onSubmit={handleAddUser} onCancel={() => setShowForm(false)} />
      )}
    </div>
  )
} 