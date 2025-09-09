"use client"
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export function useTodos() {
  const { address } = useAccount()
  const [todos, setTodos] = useState<Todo[]>([])

  // Load todos from localStorage on mount and when wallet changes
  useEffect(() => {
    if (address) {
      const saved = localStorage.getItem(`todos-${address}`)
      if (saved) {
        setTodos(JSON.parse(saved))
      } else {
        setTodos([])
      }
    } else {
      setTodos([])
    }
  }, [address])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (address && todos.length >= 0) {
      localStorage.setItem(`todos-${address}`, JSON.stringify(todos))
    }
  }, [todos, address])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
      )
    )
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    editTodo,
  }
}
