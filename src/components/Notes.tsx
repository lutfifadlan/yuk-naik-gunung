import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EditorRoot, EditorContent } from 'novel'
import { JSONContent } from '@tiptap/react' // Importing JSONContent for correct typing

export function NotesComponent() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined) // Ensure state is JSONContent

  const saveNotes = () => {
    // Here you would save the notes to your backend
    console.log('Saving notes:', content)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Hiking Notes</h2>
      <EditorRoot>
        <EditorContent 
          initialContent={content}  // Use 'initialContent' to set initial editor content
          onUpdate={(editor: any) => {  // Assuming `onUpdate` is the correct prop for content change
            setContent(editor?.storage?.markdown?.getMarkdown() as JSONContent) // Cast to JSONContent
          }}
        />
      </EditorRoot>
      <Button onClick={saveNotes} className="mt-4">Save Notes</Button>
    </div>
  )
}
