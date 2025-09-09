'use client';

import { useAccount } from 'wagmi';
import { WalletConnect } from '@/components/WalletConnect';
import { AddTodo } from '@/components/AddTodo';
import { TodoItem } from '@/components/TodoItem';
import { TodoStats } from '@/components/TodoStats';
import { useTodos } from '@/hooks/useTodos';
import { CheckSquare, Zap } from 'lucide-react';

export default function Page() {
  const { isConnected } = useAccount();
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo } = useTodos();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-[hsl(var(--primary))] shadow-soft animate-float">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-[hsl(var(--foreground))]">
              Web3 Todos
            </h1>
            <div className="p-3 rounded-full bg-[hsl(var(--primary))] shadow-soft animate-float">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Your decentralized task manager powered by blockchain technology
          </p>

          {/* Wallet Connection */}
          <div className="mb-8">
            <WalletConnect />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Add Todo Form */}
          <div className="card-surface p-6 border border-border/50">
            <AddTodo onAdd={addTodo} disabled={!isConnected} />
          </div>

          {/* Connection Status */}
          {!isConnected && (
            <div className="text-center p-6 card-surface border border-border/50">
              <div className="text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-3 text-primary animate-pulse" />
                <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                <p>Connect your Web3 wallet to start managing your tasks securely on the blockchain.</p>
              </div>
            </div>
          )}

          {/* Todos List */}
          {isConnected && (
            <>
              {/* Stats */}
              <TodoStats todos={todos} onClearCompleted={clearCompleted} />

              {/* Todo Items */}
              <div className="space-y-3">
                {todos.length === 0 ? (
                  <div className="text-center p-8 card-surface border border-border/50">
                    <CheckSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                    <p className="text-muted-foreground">
                      Add your first task to get started with your Web3 todo list!
                    </p>
                  </div>
                ) : (
                  todos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/20">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ using Next.js, Wagmi, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
