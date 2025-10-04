import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useCardsStore = defineStore('cards', {
  state: () => ({
    cards: [],
    error: null,
    loading: false,
  }),

  getters: {
    cardsByStatus: (state) => {
      return (statusId) => state.cards.filter((c) => c.status_id === statusId)
    },
  },

  actions: {
    async fetchCards(boardId) {
      this.error = null
      this.loading = true

      try {
        const res = await api.get('/cards')
        this.cards = res.data?.data?.filter((c) => c.board_id === boardId) ?? []
      } catch {
        this.error = 'Failed to fetch cards'
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async saveCard(payload, isEdit = false, id = null) {
      if (!payload.title?.trim()) {
        toast.error('Card title is required')
        return false
      }

      if (isEdit) {
        const existing = this.cards.find((c) => c.id === id)
        if (!existing) {
          toast.error('Card not found')
          return false
        }

        const noChanges =
          existing.title === payload.title.trim() &&
          (existing.description ?? '') === (payload.description ?? '') &&
          existing.status_id === payload.status_id

        if (noChanges) {
          toast.error('No changes made')
          return false
        }

        try {
          const res = await api.put(`/cards/${id}`, payload)
          const updated = res.data?.data ?? res.data
          const index = this.cards.findIndex((c) => c.id === id)
          if (index !== -1) this.cards[index] = updated
          toast.success('Card updated')
          return true
        } catch {
          toast.error('Failed to update card')
          return false
        }
      }

      try {
        const res = await api.post('/cards', payload)
        const card = res.data?.data?.card ?? res.data?.data ?? res.data
        this.cards.unshift(card)
        toast.success('Card created')
        return true
      } catch {
        toast.error('Failed to create card')
        return false
      }
    },

    async deleteCard(id) {
      try {
        await api.delete(`/cards/${id}`)
        this.cards = this.cards.filter((c) => c.id !== id)
        toast.success('Card deleted')
      } catch {
        toast.error('Failed to delete card')
      }
    },

    reset() {
      this.cards = []
      this.error = null
      this.loading = false
    },
  },
})
