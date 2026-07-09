import { create } from 'zustand'
import { PTW } from '@types/index'

interface PTWState {
  ptws: PTW[]
  currentPTW: PTW | null
  isLoading: boolean
  error: string | null

  fetchPTWs: () => Promise<void>
  fetchPTW: (id: string) => Promise<void>
  createPTW: (ptw: Omit<PTW, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updatePTW: (id: string, ptw: Partial<PTW>) => Promise<void>
  deletePTW: (id: string) => Promise<void>
  approvePTW: (id: string, comments?: string) => Promise<void>
  rejectPTW: (id: string, reason: string) => Promise<void>
  closePTW: (id: string) => Promise<void>
  clearError: () => void
}

export const usePTWStore = create<PTWState>((set, get) => (({
  ptws: [],
  currentPTW: null,
  isLoading: false,
  error: null,

  fetchPTWs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/ptw')
      if (!response.ok) throw new Error('Failed to fetch PTWs')
      const data = await response.json()
      set({ ptws: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error fetching PTWs',
        isLoading: false,
      })
    }
  },

  fetchPTW: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}`)
      if (!response.ok) throw new Error('Failed to fetch PTW')
      const data = await response.json()
      set({ currentPTW: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error fetching PTW',
        isLoading: false,
      })
    }
  },

  createPTW: async (ptw) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/ptw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ptw),
      })
      if (!response.ok) throw new Error('Failed to create PTW')
      const newPTW = await response.json()
      set((state) => (({
        ptws: [...state.ptws, newPTW],
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error creating PTW',
        isLoading: false,
      })
      throw error
    }
  },

  updatePTW: async (id: string, ptw: Partial<PTW>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ptw),
      })
      if (!response.ok) throw new Error('Failed to update PTW')
      const updatedPTW = await response.json()
      set((state) => (({
        ptws: state.ptws.map((p) => (p.id === id ? updatedPTW : p)),
        currentPTW: state.currentPTW?.id === id ? updatedPTW : state.currentPTW,
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error updating PTW',
        isLoading: false,
      })
      throw error
    }
  },

  deletePTW: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete PTW')
      set((state) => (({
        ptws: state.ptws.filter((p) => p.id !== id),
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error deleting PTW',
        isLoading: false,
      })
      throw error
    }
  },

  approvePTW: async (id: string, comments?: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments }),
      })
      if (!response.ok) throw new Error('Failed to approve PTW')
      const updatedPTW = await response.json()
      set((state) => (({
        ptws: state.ptws.map((p) => (p.id === id ? updatedPTW : p)),
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error approving PTW',
        isLoading: false,
      })
      throw error
    }
  },

  rejectPTW: async (id: string, reason: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      })
      if (!response.ok) throw new Error('Failed to reject PTW')
      const updatedPTW = await response.json()
      set((state) => (({
        ptws: state.ptws.map((p) => (p.id === id ? updatedPTW : p)),
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error rejecting PTW',
        isLoading: false,
      })
      throw error
    }
  },

  closePTW: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/ptw/${id}/close`, { method: 'POST' })
      if (!response.ok) throw new Error('Failed to close PTW')
      const updatedPTW = await response.json()
      set((state) => (({
        ptws: state.ptws.map((p) => (p.id === id ? updatedPTW : p)),
        isLoading: false,
      })))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error closing PTW',
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
})))
