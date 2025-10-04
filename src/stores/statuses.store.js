import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useStatusesStore = defineStore('statuses', {
  state: () => ({
    statuses: [],
    error: null,
    loading: false,
  }),

  getters: {
    hasStatuses: (state) => state.statuses.length > 0,
  },

  actions: {
    async fetchStatuses(boardId) {
      this.error = null
      this.loading = true

      try {
        const res = await api.get('/statuses')
        this.statuses = res.data?.data?.filter((s) => s.board_id === boardId) ?? []
      } catch {
        this.error = 'Failed to fetch statuses'
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async saveStatus(payload, isEdit = false, id = null) {
      if (!payload.name?.trim()) {
        toast.error('Status name is required')
        return false
      }

      if (isEdit) {
        const existing = this.statuses.find((s) => s.id === id)
        if (!existing) {
          toast.error('Status not found')
          return false
        }

        const noChanges =
          existing.name === payload.name.trim() && (existing.color ?? '') === (payload.color ?? '')

        if (noChanges) {
          toast.error('No changes made')
          return false
        }

        try {
          const res = await api.put(`/statuses/${id}`, payload)
          const updated = res.data?.data ?? res.data
          const index = this.statuses.findIndex((s) => s.id === id)
          if (index !== -1) this.statuses[index] = updated
          toast.success('Status updated')
          return true
        } catch {
          toast.error('Failed to update status')
          return false
        }
      }

      try {
        const res = await api.post('/statuses', payload)
        const status = res.data?.data?.status ?? res.data?.data ?? res.data
        this.statuses.push(status)
        toast.success('Status created')
        return true
      } catch {
        toast.error('Failed to create status')
        return false
      }
    },

    async deleteStatus(id) {
      try {
        await api.delete(`/statuses/${id}`)
        this.statuses = this.statuses.filter((s) => s.id !== id)
        toast.success('Status deleted')
      } catch {
        toast.error('Failed to delete status')
      }
    },

    reset() {
      this.statuses = []
      this.error = null
      this.loading = false
    },
  },
})