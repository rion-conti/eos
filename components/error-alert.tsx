"use client"
export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
      <p className="font-bold">Backend Issue</p>
      <p>{message}</p>
    </div>
  )
}
