import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import MainLayout from '@/layouts/Main.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				layout: MainLayout
			}
		}
	],
	
})

export default router
