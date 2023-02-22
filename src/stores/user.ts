import { defineStore } from "pinia"
import { useDocument, useCollection, useFirestore, getCurrentUser } from "vuefire"
import { collection, doc, setDoc, updateDoc, deleteDoc, getDoc, query, orderBy, limit } from "firebase/firestore"
import { ref, computed } from "vue"
import type { DocumentData, Timestamp, OrderByDirection } from 'firebase/firestore'

interface IUserData {
    username: string
    bio: string
    email: string
    languages?: string[]
    addedAt: Timestamp
    group: 2
}

export const useUser = defineStore('user', () => {
    const db = useFirestore()
    const user = ref<DocumentData>()
    const roomInfo = ref<DocumentData>()
    const isLoaded = computed(() => user.value !== undefined)
    const currentRoom = computed<DocumentData>(() => roomInfo.value?.currentRoom ?? null)
    const inTheRoom = computed(() => currentRoom.value !== null && currentRoom.value.id !== undefined)
    const isWaiting = computed(() => roomInfo.value?.isWaiting as boolean)
    const exRooms = ref<Array<DocumentData>>([])
    const exRoomsLimit = ref(10)
    const exRoomsOrder = ref<OrderByDirection>('desc')
    const token = ref('')
    

    const load = async () => {
        if (isLoaded.value) return
        const _user = await getCurrentUser()
        
        if (!_user) throw new Error('Failed to load user')
        const userRef = doc(db, 'users', _user.uid)
        const roomInfoRef = doc(db, 'users', _user.uid, 'locked', 'roomInfo')
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) throw new Error('User not registered')
        await useDocument(roomInfoRef, { target: roomInfo }).promise.value
        await useDocument(userRef, { target: user }).promise.value
        await loadExRooms()
        token.value = await _user.getIdToken(true)
    }

    const add = async (uid: string, userData: IUserData) => {
        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, userData)
        await load()
    }

    const update = async (userData: DocumentData) => {
        const userRef = doc(db, 'users', user.value?.id)
        await updateDoc(userRef, userData)
    }

    const remove = async () => {
        const userRef = doc(db, 'users', user.value?.id)
        await deleteDoc(userRef)
    }

    const loadExRooms = async () => {
        const roomRefs = collection(db, `users/${user.value!.id}/exRooms`)
        const _query = computed(
            () => query(roomRefs, orderBy('addedAt', exRoomsOrder.value), limit(exRoomsLimit.value))
        )
        await useCollection(_query, { target: exRooms }).promise.value
    }

    const loadMoreExRooms = (delta: number) => exRoomsLimit.value += delta
    const orderExRooms = (order: OrderByDirection) => exRoomsOrder.value = order 

    const searchRoom = async () => {
        try {
            const result = await fetch('https://echoend1-afinex04.b4a.run/hall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value,
                }
            })
            if (result.ok) return result
        } catch(err) { console.error('Failed to search room: ' + err)}
    }

    const leaveRoom = async () => {
        try {
            const result = await fetch(`https://echoend1-afinex04.b4a.run/rooms/${currentRoom.value.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.value,
                }
            })
            if (result.ok) return result
        } catch(err) { console.error('Failed  to leave room: ' + err) }
    }

    return {
        user,
        roomInfo,
        isLoaded,
        currentRoom,
        inTheRoom,
        isWaiting,
        exRooms,
        exRoomsLimit,
        exRoomsOrder,
        load,
        add,
        update,
        remove,
        loadExRooms,
        loadMoreExRooms,
        orderExRooms,
        searchRoom,
        leaveRoom,
    }
})
