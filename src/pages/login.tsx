import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}