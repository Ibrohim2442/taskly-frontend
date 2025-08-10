import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";

const routes = [
    {
        path: "/register",
        name: "Register",
        component: RegisterView,
        meta: { guest: true },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: { guest: true },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardView,
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth) {
        if (!auth.isAuthenticated()) {
            return next({ name: "Login" });
        }

        // Foydalanuvchi ma’lumotlari yuklanmagan bo‘lsa yukla
        if (!auth.user) {
            try {
                await auth.fetchUser();
            } catch {
                await auth.logout();
                return next({ name: "Login" });
            }
        }

        return next();
    }

    if (to.meta.guest) {
        if (auth.isAuthenticated()) {
            return next({ name: "Dashboard" });
        }
        return next();
    }

    return auth.isAuthenticated() ? next({ name: "Dashboard" }) : next({ name: "Login" });
});

export default router;