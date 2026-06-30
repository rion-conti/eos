'use client' // Error boundaries MUST be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an external service (e.g., Sentry, Datadog)
    console.error('Captured Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">
        {/* In production, error messages are often generic to avoid leaking data */}
        We encountered an unexpected error. Please try again or contact support if the issue persists.
      </p>
      <button
        onClick={() => reset()} // Attempt to recover by re-rendering the segment
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Try again
      </button>
    </div>
  )
}