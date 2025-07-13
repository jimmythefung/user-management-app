interface UserSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function UserSearch({ searchTerm, onSearchChange }: UserSearchProps) {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Search users by email or name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
} 