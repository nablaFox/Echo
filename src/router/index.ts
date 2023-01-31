import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Lobby from '@/views/Lobby.vue'
import { useAuth } from '@/composables/auth'
import { useUser } from '@/stores/user'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: { layout: MainLayout }
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: { layout: MainLayout },
		},
		{
			path: '/Lobby',
			name: 'Lobby',
			component: Lobby,
			meta: { layout: MainLayout },
		},
	],
})


router.beforeEach(async to => {
	const { isLogin } = useAuth()
	const userStore = useUser()

	if (!await isLogin() && to.name !== 'Login') {
		return { name: 'Login' }
	}

	if (userStore.currentRoom && to.name !== 'home') { // se la currentRoom è attiva, rendirizza l'utente alla home
		return { name: 'home' }
	}
})


export default router