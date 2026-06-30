import { House } from "lucide-react"
import Link from "next/link"

export default function Logo() {
  return (
    <>
      <Link href="/">
        <House />
      </Link>
    </>
  )
}
