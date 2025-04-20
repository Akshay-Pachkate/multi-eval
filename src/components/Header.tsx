import React from 'react'
import { Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="glass-effect sticky top-0 border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="gradient-text font-bold text-xl tracking-tight">
            MultiEvalScore
          </span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-primary hover:text-primary-dark transition-colors">
            Login
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-all transform hover:scale-105">
            Signup
          </button>
        </div>
      </div>
    </header>
  )
}