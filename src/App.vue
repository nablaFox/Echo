<script setup lang="ts">

import { watch, onBeforeMount } from 'vue'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUser()
const router = useRouter()
const { inTheRoom, isWaiting } = storeToRefs(userStore)

watch(inTheRoom, now => now && router.push('/')) // quando la stanza viene caricata porta l'utente alla home
watch(isWaiting, now => now && router.push('/lobby'), { // se l'utente sta aspettando portalo nella lobby
	immediate: true
})

onBeforeMount(async () => {
	try { await userStore.load() } 
	catch { router.push('/login') }
})

</script>

<template>

  	<RouterView v-slot="{ Component, route }">
		<component :is="route.meta.layout">
			<component :is="Component"></component>
		</component>
	</RouterView>

</template>

	

<style lang="scss">
</style>