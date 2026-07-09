import { create } from 'zustand'
import { User, UserRole } from '@types/index'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  clearError: () => void
  hasRole: (roles: UserRole[]) => boolean
  hasPermission: (permission: string) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => (({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error('Login failed')

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  },

  setUser: (user: User) => {
    set({ user })
    localStorage.setItem('user', JSON.stringify(user))
  },

  clearError: () => set({ error: null }),

  hasRole: (roles: UserRole[]) => {
    const { user } = get()
    return user ? roles.includes(user.role) : false
  },

  hasPermission: (permission: string) => {
    const { user } = get()
    if (!user) return false

    const permissions: Record<UserRole, string[]> = {
      admin: ['*'],
      hse_manager: ['view_all', 'create_ptw', 'approve_ptw', 'manage_incidents', 'view_analytics'],
      electrical_engineer: ['view_all', 'create_ptw', 'approve_electrical', 'create_isolation'],
      mechanical_engineer: ['view_all', 'create_ptw', 'approve_mechanical', 'create_loto'],
      production_engineer: ['view_all', 'create_ptw', 'view_analytics'],
      operations_supervisor: ['view_all', 'create_ptw', 'approve_general'],
      area_authority: ['view_all', 'approve_ptw', 'manage_area'],
      maintenance_supervisor: ['view_all', 'create_loto', 'manage_maintenance'],
      contractor: ['view_own', 'create_ptw', 'report_incidents'],
      inspector: ['view_all', 'create_inspection', 'manage_checklist'],
      employee: ['view_own', 'report_near_miss', 'report_incidents'],
      executive_readonly: ['view_analytics', 'view_dashboard'],
    }

    const userPermissions = permissions[user.role] || []
    return userPermissions.includes('*') || userPermissions.includes(permission)
  },
})))
