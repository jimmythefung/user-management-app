import { User } from '../types/user'
import UserTable from './UserTable'
import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'
import Pagination from './Pagination'

interface UsersContainerProps {
  users: User[]
  loading: boolean
  searchTerm: string
  currentPage: number
  totalPages: number
  onDeleteUser: (userId: number) => void
  onPageChange: (page: number) => void
}

export default function UsersContainer({
  users,
  loading,
  searchTerm,
  currentPage,
  totalPages,
  onDeleteUser,
  onPageChange
}: UsersContainerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
      </div>
      
      {loading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <EmptyState searchTerm={searchTerm} />
      ) : (
        <>
          <UserTable users={users} onDeleteUser={onDeleteUser} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        </>
      )}
    </div>
  )
} 