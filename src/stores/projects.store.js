import { defineStore } from 'pinia'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        activeProjectId: '',
        error: null,
    }),

    getters: {
        activeProject(state) {
            return state.projects.find(p => p.id === state.activeProjectId) || null
        },
    },

    actions: {
        async fetchProjects() {
            this.error = null
            try {
                const res = await api.get('/projects')
                this.projects = res.data?.data ?? []
                if (this.projects.length > 0 && !this.activeProjectId) {
                    this.activeProjectId = this.projects[0].id
                }
            } catch {
                this.error = 'Failed to fetch projects'
                toast.error(this.error)
            }
        },

        async createProject(payload) {
            if (!payload.name?.trim()) {
                toast.error('Project name is required')
                return false
            }
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
        },

        async updateProject(id, payload) {
            if (!payload.name?.trim()) {
                toast.error('Project name is required')
                return false
            }
            const existing = this.projects.find(p => p.id === id)
            if (
                existing &&
                existing.name === payload.name.trim() &&
                (existing.description || '') === (payload.description?.trim() || '')
            ) {
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
        },

        async deleteProject(id) {
            try {
                await api.delete(`/projects/${id}`)
                this.projects = this.projects.filter(p => p.id !== id)
                if (this.activeProjectId === id) this.activeProjectId = ''
                toast.success('Project deleted')
            } catch {
                toast.error('Failed to delete project')
            }
        },

        setActiveProject(projectId) {
            this.activeProjectId = projectId
        },

        showToast(msg, type = 'info') {
            type === 'error' ? toast.error(msg) : toast.success(msg)
        },
    },
})
