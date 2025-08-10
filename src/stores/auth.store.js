import { defineStore } from 'pinia'
import api from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        errors: {},
        loading: false
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async register(payload) {
            this.loading = true
            this.errors = {}
            try {
                await api.post('/register', payload)
                return true
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors
                }
                return false
            } finally {
                this.loading = false
            }
        },

        async login(payload) {
            this.loading = true
            this.errors = {}
            try {
                const { data } = await api.post('/login', payload)
                this.token = data.data.token
                this.user = data.data.user
                localStorage.setItem('token', this.token)
                return true
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors
                } else if (error.response?.status === 401) {
                    this.errors = { email: ['The provided credentials are incorrect.'] }
                }
                return false
            } finally {
                this.loading = false
            }
        },

        async fetchUser() {
            if (!this.token) return
            try {
                const { data } = await api.get('/me')
                this.user = data.data
            } catch {
                this.logout()
            }
        },

        async logout() {
            try {
                await api.post('/logout')
            } catch (error) {
                if (error.response?.status !== 401) {
                    console.error('Logout error:', error.response?.data || error.message)
                }
            } finally {
                this.user = null
                this.token = null
                localStorage.removeItem('token')
                router.push('/login')
            }
        }
    }
})
