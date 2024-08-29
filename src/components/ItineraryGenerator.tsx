import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ItineraryGenerator() {
  const [mountain, setMountain] = useState('')
  const [days, setDays] = useState('')
  const [itinerary, setItinerary] = useState('')

  const generateItinerary = () => {
    // Here you would integrate with an AI service to generate the itinerary
    setItinerary(`Sample itinerary for ${mountain} for ${days} days...`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Itinerary Generator</h2>
      <Input
        type="text"
        value={mountain}
        onChange={(e) => setMountain(e.target.value)}
        placeholder="Mountain name"
        className="mb-2"
      />
      <Input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="Number of days"
        className="mb-2"
      />
      <Button onClick={generateItinerary} className="mb-4">Generate Itinerary</Button>
      <Textarea value={itinerary} readOnly className="h-40" />
    </div>
  )
}