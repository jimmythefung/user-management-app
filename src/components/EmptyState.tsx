interface EmptyStateProps {
  searchTerm: string
}

export default function EmptyState({ searchTerm }: EmptyStateProps) {
  return (
    <div className="p-8 text-center text-gray-500">
      {searchTerm ? 'No users found matching your search.' : 'No users found.'}
    </div>
  )
} 