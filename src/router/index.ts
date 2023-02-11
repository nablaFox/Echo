import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/auth'
import { useUser } from '@/stores/user'
import routes from './routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(async (to, from, next) => {
	const { isLogin } = useAuth()
	const userStore = useUser()

	if (
		!await isLogin() 
		&& to.name !== 'SignUp'
		&& to.name !== 'SignIn'
	) {
		next({ name: 'SignUp' })
	}

	if (
		to.name === 'SignUp'
		|| to.name === 'SignIn'
	) {
		if (await isLogin()) return next({ name: 'Home' }) // redirect the user if is logged
		return next() 
	}
	// if the user wants to login, there is no need to load data
	
	try { !userStore.isLoaded && await userStore.load() }
	catch { return next({ name: 'SignUp' }) }
	// if there is an error, since the user is logged
	// it means that the user has yet to register

	if (
		userStore.inTheRoom
		&& to.name !== 'Room'
	) {
		return next({ 
			name: 'Room', 
			params: { id: userStore.currentRoom.id }
		})
	} // if the user is in the room, always redirect him in the room

	if (
		userStore.isWaiting
		&& to.name !== 'Lobby'
	) {
		return next({ name: 'Lobby' })
	} // if the user is waiting, always redirect him in the lobby

	next()
})

export default router