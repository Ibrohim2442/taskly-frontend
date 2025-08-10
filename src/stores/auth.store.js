import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
    }),

    actions: {
        async login(email, password) {
            try {
                const { data } = await api.post("/login", { email, password });
                if (data.token) {
                    this.token = data.token;
                    this.user = data.user;
                    localStorage.setItem("token", data.token);
                    return data;
                } else {
                    // Backenddan xatolarni qaytaramiz
                    return { errors: data.errors || { general: "Login failed" } };
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    // Validation errors
                    return { errors: error.response.data.errors };
                }
                throw error;  // boshqa xatolarni tashlab yuboramiz
            }
        },

        async register(name, email, password, password_confirmation) {
            const { data } = await api.post("/register", {
                name,
                email,
                password,
                password_confirmation,
            });

            if (data.token) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem("token", data.token);
            }
        },

        async logout() {
            await api.post("/logout");
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
        },

        async fetchUser() {
            try {
                const { data } = await api.get("/me");
                this.user = data;
            } catch (error) {
                this.logout();
            }
        },

        isAuthenticated() {
            return !!this.token;
        },
    },
});
