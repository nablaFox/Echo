import MainLayout from '@/layouts/Main.vue'
import FullScreen from '@/layouts/FullScreen.vue'

import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Lobby from '@/views/Lobby.vue'
import Room from '@/views/Room.vue'

export default [
    {
        path: '/',
        name: 'Home',
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
        meta: { layout: FullScreen },
    },
    {
        path: '/room/:id',
        name: 'Room',
        component: Room,
        props: true,
        meta: { layout: FullScreen },
    }
]