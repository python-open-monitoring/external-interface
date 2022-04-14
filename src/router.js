import Vue from 'vue'
import store from './store'
import VueRouter from 'vue-router'
import MainIndex from './views/main/MainIndex'
import Developer from './views/main/Developer'
import MonitorList from './views/monitor/MonitorList'
import MonitorView from './views/monitor/MonitorView'
import UserRegister from './views/user/Register'
import UserLogin from './views/user/Login'
import ResetPassword from './views/user/ResetPassword'
import ResetPasswordConfirm from './views/user/ResetPasswordConfirm'
import ChangePassword from './views/user/ChangePassword'
import Dashboard from './views/user/Dashboard'
import UserProfile from './views/user/UserProfile'


Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'MainIndex',
            component: MainIndex,
        },

        {
            path: '/developer',
            name: 'Developer',
            component: Developer,
        },

        {
            path: '/user/register',
            name: 'UserRegister',
            component: UserRegister,
        },
        {
            path: '/user/login',
            name: 'UserLogin',
            component: UserLogin,
        },
        {
            path: '/user/reset-password',
            name: 'ResetPassword',
            component: ResetPassword,
        },
        {
            path: '/user/reset-password-confirm/*',
            name: 'ResetPasswordConfirm',
            component: ResetPasswordConfirm,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user/user-profile',
            name: 'UserProfile',
            component: UserProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user/change-password',
            name: 'ChangePassword',
            component: ChangePassword,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/monitor/list',
            name: 'MonitorList',
            component: MonitorList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/monitor/view/:id',
            name: 'MonitorView',
            component: MonitorView,
            meta: {
                requiresAuth: true
            }
        },

    ],
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/user/login')
    } else {
        next()
    }
})

export default router;