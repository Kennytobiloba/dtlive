"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  const insertTag = (openTag: string, closeTag: string, placeholder = "") => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || placeholder
    const newValue = value.substring(0, start) + openTag + textToInsert + closeTag + value.substring(end)
    onChange(newValue)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + openTag.length + textToInsert.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 flex items-center gap-1 border-b border-border flex-wrap">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<h2>", "</h2>", "Heading 2")}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<h3>", "</h3>", "Heading 3")}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<strong>", "</strong>", "bold text")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<em>", "</em>", "italic text")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>", "list item")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<ol>\n  <li>", "</li>\n</ol>", "list item")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => insertTag("<blockquote>", "</blockquote>", "quote")}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => insertTag("<p>", "</p>", "paragraph")}>
          P
        </Button>
        <div className="ml-auto">
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {showPreview ? (
        <div className="p-4 min-h-[400px] prose max-w-none" dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <textarea
          id="editor"
          className="w-full p-4 min-h-[400px] resize-y focus:outline-none bg-background font-mono text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your content here using HTML tags..."
        />
      )}
    </div>
  )
}
