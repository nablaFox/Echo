import { useCollection, useDocument, useFirestore } from "vuefire"
import { collection, doc, addDoc, query, orderBy, limit, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, computed, onMounted } from "vue"
import { Timestamp } from "firebase/firestore"
import type { DocumentData } from 'firebase/firestore'

export function useRoom(id: string) {
    const db = useFirestore()
    const data = ref<DocumentData>()
    const info = computed(() => data.value?.info)
    const messages = ref<DocumentData[]>()
    const messagesLimit = ref(100)
    const loaded = ref(false)

    onMounted(() => load(id))

    const load = async (id: string) => {
        const roomRef = doc(db, 'rooms', id)
        await useDocument(roomRef, { target: data }).promise.value
        await loadMessages()
        loaded.value = true
    }

    const loadMessages = async () => {
        const messagesRef = collection(db, `rooms/${id}/messages`)
        const _query = computed(
            () =>  query(messagesRef, orderBy('timestamp', 'desc'), limit(messagesLimit.value))
        )
        await useCollection(_query, { target: messages }).promise.value
    }

    const sendMessage = async (text: string, sender: string) => {
        const messagesRef = collection(db, `rooms/${id}/messages`)
        addDoc(messagesRef, {
            sender: sender,
            text: text,
            timestamp: Timestamp.now()
        })
    }

    const updateMessage = async (msgId: string, text: string) => {
        const messageRef = doc(db, `rooms/${id}/messages/${msgId}`)
        await updateDoc(messageRef, { text: text })
    }

    const deleteMessage = async (msgId: string) => {
        const messageRef = doc(db, `rooms/${id}/messages/${msgId}`)
        await deleteDoc(messageRef)
    }

    const update = async (payload: DocumentData) => {
        const roomRef = doc(db, `rooms/${id}`)
        await updateDoc(roomRef, payload)
    }

    const loadMore = (delta: number) => messagesLimit.value += delta

    return {
        data,
        info,
        messages,
        messagesLimit,
        loaded,
        load,
        sendMessage,
        loadMessages,
        loadMore,
        updateMessage,
        deleteMessage,
        update
    }
}