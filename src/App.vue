<script setup lang="ts">

import { watch } from 'vue'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUser()
const router = useRouter()
const { inTheRoom } = storeToRefs(userStore)

watch(inTheRoom, now => now && router.push('/')) // quando la stanza viene caricata porta l'utente alla home

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