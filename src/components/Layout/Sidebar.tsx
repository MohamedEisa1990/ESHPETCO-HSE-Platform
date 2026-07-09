import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  FileText,
  AlertCircle,
  TrendingUp,
  CheckSquare,
  Zap,
  Lock,
  Wind,
  ClipboardList,
  BarChart3,
  FileUp,
  Bell,
  Settings,
  X,
} from 'lucide-react'
import { useAuthStore } from '@stores/authStore'
import clsx from 'clsx'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', roles: ['*'] },
  { icon: FileText, label: 'PTW', href: '/ptw', roles: ['*'] },
  { icon: AlertCircle, label: 'Risk Assessment', href: '/risk-assessment', roles: ['*'] },
  { icon: TrendingUp, label: 'Near Miss', href: '/near-miss', roles: ['*'] },
  { icon: AlertCircle, label: 'Incidents', href: '/incidents', roles: ['*'] },
  { icon: CheckSquare, label: 'Inspections', href: '/inspections', roles: ['*'] },
  { icon: Lock, label: 'LOTO', href: '/loto', roles: ['maintenance_supervisor', 'mechanical_engineer', 'admin'] },
  { icon: Zap, label: 'Electrical Isolation', href: '/electrical-isolation', roles: ['electrical_engineer', 'admin'] },
  { icon: Wind, label: 'Gas Testing', href: '/gas-testing', roles: ['*'] },
  { icon: ClipboardList, label: 'Corrective Actions', href: '/corrective-actions', roles: ['*'] },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', roles: ['hse_manager', 'admin', 'executive_readonly'] },
  { icon: FileUp, label: 'Documents', href: '/documents', roles: ['*'] },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user, hasRole } = useAuthStore()

  const visibleItems = menuItems.filter((item) => {
    if (item.roles.includes('*')) return true
    return user && hasRole(item.roles as any[])
  })

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed md:static top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 overflow-y-auto transition-transform duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
        >
          <X size={20} />
        </button>

        <nav className="p-4 space-y-2">
          {visibleItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
          <Link
            to="/notifications"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
          >
            <Bell size={20} />
            <span className="font-medium">Notifications</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
