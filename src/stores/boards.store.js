import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [],
    activeBoardId: '',
    error: null,
    loading: false,
  }),

  getters: {
    activeBoard(state) {
      return state.boards.find((b) => b.id === state.activeBoardId) || null
    },
  },

  actions: {
    async fetchBoards(projectId) {
      this.error = null
      this.loading = true
      try {
        const res = await api.get('/boards')
        this.boards = res.data?.data?.filter((b) => b.project_id === projectId) ?? []
        if (this.boards.length > 0 && !this.activeBoardId) {
          this.activeBoardId = this.boards[0].id
        } else if (this.boards.length === 0) {
          this.activeBoardId = ''
        }
      } catch {
        this.error = 'Failed to fetch boards'
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async saveBoard(payload, isEdit = false, id = null) {
      if (!payload.name?.trim()) {
        toast.error('Board name is required')
        return false
      }

      if (isEdit) {
        const existing = this.boards.find((b) => b.id === id)
        if (!existing) {
          toast.error('Board not found')
          return false
        }

        const noChanges =
          existing.name === payload.name.trim() &&
          (existing.description ?? '') === (payload.description ?? '')

        if (noChanges) {
          toast.error('No changes made')
          return false
        }

        try {
          const res = await api.put(`/boards/${id}`, payload)
          const updated = res.data?.data ?? res.data
          const idx = this.boards.findIndex((b) => b.id === id)
          if (idx !== -1) this.boards[idx] = updated
          toast.success('Board updated')
          return true
        } catch {
          toast.error('Failed to update board')
          return false
        }
      } else {
        try {
          const res = await api.post('/boards', payload)
          const board = res.data?.data?.board ?? res.data?.data ?? res.data
          this.boards.unshift(board)
          toast.success('Board created')
          return true
        } catch {
          toast.error('Failed to create board')
          return false
        }
      }
    },

    async deleteBoard(id) {
      try {
        await api.delete(`/boards/${id}`)
        this.boards = this.boards.filter((b) => b.id !== id)
        if (this.activeBoardId === id) this.activeBoardId = ''
        toast.success('Board deleted')
      } catch {
        toast.error('Failed to delete board')
      }
    },

    setActiveBoard(boardId) {
      this.activeBoardId = boardId
    },

    reset() {
      this.boards = []
      this.activeBoardId = ''
      this.error = null
    },
  },
})
