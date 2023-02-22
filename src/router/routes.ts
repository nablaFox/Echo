import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Lobby from '@/views/Lobby.vue'
import Room from '@/views/Room.vue'
import Profile from '@/views/Profile.vue'
import ExRooms from '@/views/ExRooms.vue'

import Main from '@/layouts/Main.vue'

export default [
    {
        path: '/',
        name: 'Home',
        meta: { layout: Main },
        component: Home,
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/lobby',
        name: 'Lobby',
        component: Lobby
    },
    {
        path: '/room/:id',
        name: 'Room',
        component: Room,
        meta: { transition: 'blur' },
        props: true
    },
    { 
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/exRooms',
        name: 'ExRooms',
        meta: { layout: Main },
        component: ExRooms,
    }
]