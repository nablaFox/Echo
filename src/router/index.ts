import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/auth'
import { useUser } from '@/stores/user'

import MainLayout from '@/layouts/Main.vue'
import FullScreen from '@/layouts/FullScreen.vue'

import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Lobby from '@/views/Lobby.vue'
import Room from '@/views/Room.vue'

function checkLobby() {
	const userStore = useUser()
	if (!userStore.isWaiting) return false
}

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
		},
		{
			path: '/lobby',
			name: 'Lobby',
			component: Lobby,
			beforeEnter: checkLobby,
			meta: { layout: FullScreen },
		},
		{
			path: '/room/:id',
			name: 'Room',
			component: Room,
			props: true,
			meta: { layout: FullScreen },
		}
	],
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
	) { return next() }
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