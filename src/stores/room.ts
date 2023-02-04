import { defineStore } from "pinia"
import { useCollection, useFirestore } from "vuefire"
import { collection, doc, addDoc, query, orderBy, limit, updateDoc, deleteDoc } from "firebase/firestore"
import { ref, computed } from "vue"
import { Timestamp } from "firebase/firestore"
import type { DocumentData } from 'firebase/firestore'

export const useRoom = defineStore('room', () => {
    const db = useFirestore()
    const id = ref<string>()
    const messages = ref<DocumentData[]>()
    const messagesLimit = ref(100)

    const loadMessages = async (roomId: string) => {
        const messagesRef = collection(db, `rooms/${roomId}/messages`)
        const messagesQuery = computed(
            () =>  query(messagesRef, orderBy('timestamp', 'desc'), limit(messagesLimit.value))
        )
        await useCollection(messagesQuery, { target: messages }).promise.value
        id.value = roomId
    }

    const sendMessage = async (text: string, sender: string) => {
        const messagesRef = collection(db, `rooms/${id.value}/messages`)
        await addDoc(messagesRef, {
            sender: sender,
            text: text,
            timestamp: Timestamp.now()
        })
    }

    const updateMessage = async (msgId: string, text: string) => {
        const messageRef = doc(db, `rooms/${id.value}/messages/${msgId}`)
        await updateDoc(messageRef, { text: text })
    }

    const deleteMessage = async (msgId: string) => {
        const messageRef = doc(db, `rooms/${id.value}/messages/${msgId}`)
        await deleteDoc(messageRef)
    }

    const update = async (payload: DocumentData) => {
        const roomRef = doc(db, `rooms/${id.value}`)
        await updateDoc(roomRef, payload)
    }

    const loadMore = (delta: number) => messagesLimit.value += delta

    return {
        id,
        messages,
        messagesLimit,
        sendMessage,
        loadMessages,
        updateMessage,
        deleteMessage,
        loadMore,
        update
    }
})

