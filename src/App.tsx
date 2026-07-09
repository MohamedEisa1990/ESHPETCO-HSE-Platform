import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '@components/Layout/Header'
import { Sidebar } from '@components/Layout/Sidebar'
import { useAuthStore } from '@stores/authStore'
import { useDarkMode } from '@hooks/useDarkMode'
import { useOnline } from '@hooks/useOnline'
import Login from '@pages/Auth/Login'
import Dashboard from '@pages/Dashboard'
import PTWList from '@pages/PTW/PTWList'
import PTWCreate from '@pages/PTW/PTWCreate'
import PTWDetail from '@pages/PTW/PTWDetail'
import Incidents from '@pages/Incidents'
import NearMiss from '@pages/NearMiss'
import Inspections from '@pages/Inspections'
import Analytics from '@pages/Analytics'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggle: toggleTheme } = useDarkMode()
  const isOnline = useOnline()
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header
              onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
              isDark={isDark}
              onThemeToggle={toggleTheme}
            />
            {!isOnline && (
              <div className="bg-warning text-white px-4 py-2 text-center text-sm">
                You are currently offline. Some features may be limited.
              </div>
            )}
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/ptw" element={<ProtectedRoute><PTWList /></ProtectedRoute>} />
                <Route path="/ptw/new" element={<ProtectedRoute><PTWCreate /></ProtectedRoute>} />
                <Route path="/ptw/:id" element={<ProtectedRoute><PTWDetail /></ProtectedRoute>} />
                <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
                <Route path="/near-miss" element={<ProtectedRoute><NearMiss /></ProtectedRoute>} />
                <Route path="/inspections" element={<ProtectedRoute><Inspections /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  )
}