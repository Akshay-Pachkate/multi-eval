import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Results } from './pages/Results'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
    </div>
  )
}

export default App