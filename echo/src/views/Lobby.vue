<script setup lang="ts">
import { watch, ref } from 'vue'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUser()
const { inTheRoom, currentRoom, isWaiting } = storeToRefs(userStore)

const exit = ref(false)

watch(
    inTheRoom, 
    now => now && router.push(`/room/${currentRoom.value.id}`),
    { immediate: true }
)

watch(
    isWaiting,
    now => !now && exit.value && router.push('/')
)

function onLeave() {
    userStore.leaveHall()               
    exit.value = true
}
</script>


<template>
    
    <div v-if="isWaiting">
        Searching...
        
        <button @click="onLeave"> 
            Leave Hall
        </button>
    </div>

    <div v-else-if="!inTheRoom">
        searching failed

        <RouterLink to="/">
            Back to home
        </RouterLink>
    </div>
    
</template>

<style lang="scss">
</style>