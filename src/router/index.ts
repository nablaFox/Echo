import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/Main.vue'
import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
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
			path: '/signin',
			name: 'SignIn',
			component: SignIn,
			meta: { layout: MainLayout },
		},
		{
			path: '/signup',
			name: 'SignUp',
			component: SignUp,
			meta: { layout: MainLayout },
		}
	],
})


router.beforeEach(async to => {
	const { isLogin } = useAuth()
	const userStore = useUser()

	if (
		!await isLogin() 
		&& to.name !== 'SignUp'
		&& to.name !== 'SignIn'
	) {
		console.log('flag')
		return { name: 'SignUp' } 
	}

	if (
		!userStore.isLoaded
		&& to.name !== 'SignUp'
		&& to.name !== 'SignIn'
	) {
		try { await userStore.load() }
		catch { return { name: 'SignUp' } } 
		// se c'è un errore, visto che prima si è effettuato il login
		// vuol dire che l'utente si deve ancora registrare
	}
})


export default router