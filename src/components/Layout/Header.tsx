import React, { useState } from 'react'
import { Menu, Bell, Settings, LogOut, Moon, Sun } from 'lucide-react'
import { useAuthStore } from '@stores/authStore'
import { Link } from 'react-router-dom'

interface HeaderProps {
  onMenuToggle: () => void
  isDark: boolean
  onThemeToggle: () => void
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isDark, onThemeToggle }) => {
  const { user, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="hidden sm:block text-xl font-bold text-gray-900 dark:text-white">
              ESHPETCO HSE
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
            <Bell size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
          >
            {isDark ? (
              <Sun size={20} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 first:rounded-t-lg"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setShowUserMenu(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-danger hover:bg-gray-100 dark:hover:bg-slate-700 w-full text-left last:rounded-b-lg"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
