import { defineStore } from 'pinia';
import api from '@/services/api';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        activeProject: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchProjects() {
            this.loading = true;
            this.error = null;
            try {
                const res = await api.get('/projects');
                this.projects = res.data?.data ?? [];
            } catch (err) {
                this.error = 'Failed to fetch projects';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async createProject(payload) {
            const res = await api.post('/projects', payload);
            const project = res.data?.data?.project ?? res.data?.data ?? res.data;
            this.projects.unshift(project);
            return project;
        },

        async updateProject(id, payload) {
            const res = await api.put(`/projects/${id}`, payload);
            const updated = res.data?.data ?? res.data;
            const idx = this.projects.findIndex(p => p.id === id);
            if (idx !== -1) this.projects[idx] = updated;
            return updated;
        },

        async deleteProject(id) {
            await api.delete(`/projects/${id}`);
            this.projects = this.projects.filter(p => p.id !== id);
        },

        setActiveProject(project) {
            this.activeProject = project;
        }
    }
});
