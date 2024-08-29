import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Indonesia Mountain Hiker</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}