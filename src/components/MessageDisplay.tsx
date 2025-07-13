interface MessageDisplayProps {
  message: string
}

export default function MessageDisplay({ message }: MessageDisplayProps) {
  if (!message) return null

  return (
    <div className="mb-4 p-3 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
      {message}
    </div>
  )
} 