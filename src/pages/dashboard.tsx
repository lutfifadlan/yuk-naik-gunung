import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { ChecklistComponent } from '@/components/Checklist'
import { ItineraryGenerator } from '@/components/ItineraryGenerator'
import { NotesComponent } from '@/components/Notes'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Welcome, {session?.user?.name || 'Hiker'}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChecklistComponent />
          <ItineraryGenerator />
          <NotesComponent />
        </div>
      </div>
    </Layout>
  )
}