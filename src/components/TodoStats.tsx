import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { Todo } from '@/hooks/useTodos'

interface TodoStatsProps {
  todos: Todo[]
  onClearCompleted: () => void
}

export function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length
  const remaining = total - completed

  if (total === 0) return null

  return (
    <div className="gradient-card p-4 rounded-lg shadow-card border border-border/50 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {remaining} of {total} tasks remaining
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="text-green-400">{completed} completed</span>
        </div>
        
        {completed > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={onClearCompleted}
            className="border-red-400/20 text-red-400 hover:bg-red-400/10 hover:border-red-400/40"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Completed
          </Button>
        )}
      </div>
    </div>
  )
}
