import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ChecklistComponent() {
  const [items, setItems] = useState([{ id: 1, text: 'Hiking boots', checked: false }])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, { id: Date.now(), text: newItem, checked: false }])
      setNewItem('')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Hiking Checklist</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <Checkbox
              id={`item-${item.id}`}
              checked={item.checked}
              onCheckedChange={(checked) => {
                setItems(items.map(i => i.id === item.id ? { ...i, checked: !!checked } : i))
              }}
            />
            <label htmlFor={`item-${item.id}`} className="ml-2">{item.text}</label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="mr-2"
        />
        <Button onClick={addItem}>Add</Button>
      </div>
    </div>
  )
}
