<script setup lang="ts">

import { useAuth } from '@/composables/auth'
import { useUser } from '@/stores/user';
import { useRouter } from 'vue-router'

const router = useRouter()
const { signInWithGoogle, signUpWithGoogle } = useAuth()

async function signIn() {
    const result = await signInWithGoogle()
    if (result) { router.push('/') }
    useUser().load()
}

async function signUp() {
    signUpWithGoogle(['it'])
    router.push('/')
}

</script>

<template>
    
	<button @click="signIn"> Sign In </button>
	<button @click="signUp"> Sign up </button> 

</template>


<style lang="scss">
</style>