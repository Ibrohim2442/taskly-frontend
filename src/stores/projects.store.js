// src/stores/projects.store.js
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
                // backend returns { data: [...projects] }
                this.projects = res.data?.data ?? [];
            } catch (err) {
                this.error = 'Failed to fetch projects.';
                console.error('fetchProjects error', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async createProject(payload) {
            try {
                const res = await api.post('/projects', payload);
                const project = res.data?.data?.project ?? res.data?.data ?? res.data;
                // Add to front so user sees it immediately
                this.projects.unshift(project);
                return project;
            } catch (err) {
                console.error('createProject error', err);
                throw err;
            }
        },

        async updateProject(id, payload) {
            try {
                const res = await api.put(`/projects/${id}`, payload);
                const updated = res.data?.data ?? res.data;
                const idx = this.projects.findIndex(p => p.id === id);
                if (idx !== -1) this.projects[idx] = updated;
                return updated;
            } catch (err) {
                console.error('updateProject error', err);
                throw err;
            }
        },

        async deleteProject(id) {
            try {
                await api.delete(`/projects/${id}`);
                this.projects = this.projects.filter(p => p.id !== id);
            } catch (err) {
                console.error('deleteProject error', err);
                throw err;
            }
        },

        setActiveProject(project) {
            this.activeProject = project;
        }
    }
});
