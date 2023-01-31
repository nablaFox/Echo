<script setup lang="ts">

import { useAuth } from '@/composables/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { signUp } = useAuth()

async function onClick() {
    await signUp(['it'])
    router.push('/')
}

</script>

<template>
    
	<button @click="onClick"> Sign Up </button>
	<RouterLink to="/signin"> Or sign in </RouterLink>

</template>


<style lang="scss">
</style>