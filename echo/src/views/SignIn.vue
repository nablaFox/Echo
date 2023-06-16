<script setup lang="ts">

import { useAuth } from '@/composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { signInWithGoogle } = useAuth()

async function onClick() {
    await signInWithGoogle()
    router.push('/')
}

</script>

<template>
    
	<button @click="onClick"> Sign In </button>
	<RouterLink to="/signup"> Need an account? register </RouterLink>

</template>


<style lang="scss">
</style>