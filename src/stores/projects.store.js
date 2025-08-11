import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    error: null,
    loading: false,
  }),

  getters: {
    hasProjects: (state) => state.projects.length > 0,
  },

  actions: {
    async fetchProjects() {
      this.error = null
      this.loading = true
      try {
        const res = await api.get('/projects')
        this.projects = res.data?.data ?? []
      } catch {
        this.error = 'Failed to fetch projects'
        toast.error(this.error)
      } finally {
        this.loading = false
      }
    },

    async saveProject(payload, isEdit = false, id = null) {
      if (!payload.name?.trim()) {
        toast.error('Project name is required')
        return false
      }

      if (isEdit) {
        const existing = this.projects.find((p) => p.id === id)
        if (!existing) {
          toast.error('Project not found')
          return false
        }

        let newName = payload.name.trim()
        let newDescription = payload.description || '' // description optional shuning uchun u undefined yoki null bo'la olmaydi shunda uni "" dep olamiza

        let oldName = existing.name
        let oldDescription = existing.description || ''

        let noChanges = newName === oldName && newDescription === oldDescription

        if (noChanges) {
          toast.error('No changes made')
          return false
        }

        try {
          const res = await api.put(`/projects/${id}`, payload)

          let updated
          if (res.data && res.data.data) {
            updated = res.data.data
          } else {
            updated = res.data
          }

          let idx = -1
          for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id === id) {
              idx = i
              break
            }
          }

          if (idx !== -1) {
            this.projects[idx] = updated
          }

          toast.success('Project updated')
          return true
        } catch (err) {
          toast.error('Failed to update project')
          return false
        }
      } else {
        try {
          const res = await api.post('/projects', payload)
          const project = res.data?.data?.project ?? res.data?.data ?? res.data
          this.projects.unshift(project)
          toast.success('Project created')
          return true
        } catch {
          toast.error('Failed to create project')
          return false
        }
      }
    },

    async deleteProject(id) {
      try {
        await api.delete(`/projects/${id}`)
        this.projects = this.projects.filter((p) => p.id !== id)
        toast.success('Project deleted')
      } catch {
        toast.error('Failed to delete project')
      }
    },

    reset() {
      this.projects = []
      this.error = null
      this.loading = false
    },
  },
})
