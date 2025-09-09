import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

interface AddTodoProps {
  onAdd: (text: string) => void
  disabled?: boolean
}

export function AddTodo({ onAdd, disabled }: AddTodoProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "Connect wallet to add todos..." : "What needs to be done?"}
        disabled={disabled}
        className="flex-1 bg-background/50 border-primary/20 focus:border-primary/50 placeholder:text-muted-foreground/60"
      />
      <Button
        type="submit"
        variant="web3"
        disabled={disabled || !text.trim()}
        className="px-6"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add
      </Button>
    </form>
  )
}
