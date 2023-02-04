<script setup lang="ts">
import { useUser } from '@/stores/user'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

const router = useRouter()
const { inTheRoom, currentRoom } = storeToRefs(useUser())

watch(inTheRoom, now => now && router.push(`room/${currentRoom.value.id}`))

</script>


<template>

    Searching...
    
</template>


<style lang="scss">
</style>