import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from './ui/Checkbox'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { Todo } from '@/hooks/useTodos'
import { Input } from '@/components/ui/input'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="group gradient-card p-4 rounded-lg shadow-card border border-border/50 hover:border-primary/30 transition-web3 animate-float">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-background/50 border-primary/20 focus:border-primary/50"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSave}
              className="p-1 h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-400/10"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              className="p-1 h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 ${
                todo.completed
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              } transition-web3`}
            >
              {todo.text}
            </span>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-web3">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="p-1 h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(todo.id)}
                className="p-1 h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        {new Date(todo.createdAt).toLocaleDateString()}
      </div>
    </div>
  )
}
