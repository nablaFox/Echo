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

	if (!await isLogin()) {
		if (
			to.name !== 'SignUp'
			&& to.name !== 'SignIn'
		) { return next({ name: 'SignUp' })}

		return next()
	}	
	// check if is logged

	try {
		await userStore.load()
		if (
			userStore.inTheRoom
			&& to.name !== 'Room'
		) next({ 
			name: 'Room', 
			params: { id: userStore.currentRoom.id }
		})
		// if the user is in the room, always redirect him in the room

		else if (
			userStore.isWaiting
			&& to.name !== 'Lobby'
		) next({ name: 'Lobby' }) 
		// if the user is waiting, always redirect him in the lobby 

		else if (
			to.name === 'SignUp'
			|| to.name === 'SignIn'
		) next({ name: 'Home' })
		// since is logged, redirect the user

		else if (
			to.name === 'Lobby'
			&& from.name === 'Room'
		) next({ name: 'Home' })

		else next()
	}
	catch {
		if (
			to.name !== 'SignUp'
			&& to.name !== 'SignIn'
		) return next({ name: 'SignUp' })
		
		next()
	}
	// if there is an error, since the user is logged
	// it means that the user has yet to register	
})

export default router