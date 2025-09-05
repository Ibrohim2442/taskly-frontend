import {defineStore} from 'pinia'
import api from '@/services/api'
import {useToast} from 'vue-toastification'

const toast = useToast()

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [], error: null, loading: false,
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
                const existing = this.projects.find(p => p.id === id)
                if (!existing) {
                    toast.error('Project not found')
                    return false
                }

                const noChanges = existing.name === payload.name.trim() && (existing.description ?? '') === (payload.description ?? '')

                if (noChanges) {
                    toast.error('No changes made')
                    return false
                }

                try {
                    const res = await api.put(`/projects/${id}`, payload)
                    const updated = res.data?.data ?? res.data
                    const idx = this.projects.findIndex(p => p.id === id)
                    if (idx !== -1) this.projects[idx] = updated
                    toast.success('Project updated')
                    return true
                } catch {
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
                this.projects = this.projects.filter(p => p.id !== id)
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
