import { defineStore } from "pinia"
import { useDocument, useCollection, useFirestore, getCurrentUser } from "vuefire"
import { collection, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, computed } from "vue"
import type { DocumentData } from 'firebase/firestore'

interface IUserData {
    username: string,
    bio: string,
    email: string,
    languages?: string[],
    currentRoom: null,
    group: 2,
    isWaiting: false
}

export const useUser = defineStore('user', () => {
    const db = useFirestore()
    const user = ref<DocumentData>()
    const isLoaded = computed(() => user.value !== undefined)
    const currentRoom = computed<DocumentData>(() => user.value?.currentRoom ?? null)
    const inTheRoom = computed(() => currentRoom.value !== null)
    const isWaiting = computed(() => user.value?.isWaiting as boolean)
    const exRooms = ref([])
    const token = ref('')

    const load = async () => {
        const _user = await getCurrentUser()
        if (!_user) throw new Error('Failed to load user')
        const userRef = doc(collection(db, 'users'), _user.uid)
        await useDocument(userRef, { target: user }).promise.value
        token.value = await _user.getIdToken()
    }

    const add = async (uid: string, userData: IUserData) => {
        const userRef = doc(db, 'users', uid)
        await setDoc(userRef, userData)
        await load()
    }

    const update = async (userData: DocumentData) => {
        const userRef = doc(db, 'users', user.value!.id)
        await updateDoc(userRef, userData)
    }

    const remove = async () => {
        const userRef = doc(db, 'users', user.value!.id)
        await deleteDoc(userRef)
        await (await getCurrentUser())!.delete()
    }

    const loadExRooms = async () => {
        const roomRefs = collection(db, `users/${user.value!.id}/exRooms`)
        await useCollection(roomRefs, { target: exRooms }).promise.value
    }

    const searchRoom = async () => {
        fetch('http://localhost:3000/rooms/waitingRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.value,
            }
        })
    }

    const leaveRoom = async () => {
        fetch(`http://localhost:3000/rooms/${currentRoom.value.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.value,
            }
        })
    }

    return {
        user,
        isLoaded,
        currentRoom,
        inTheRoom,
        isWaiting,
        exRooms,
        load,
        add,
        update,
        remove,
        loadExRooms,
        searchRoom,
        leaveRoom
    }
})
