<script setup lang="ts">

import { useAuth } from '@/composables/auth';
import { useUser } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Lobby from '@/components/Lobby.vue';

const router = useRouter()
const userStore = useUser()
const { user, inTheRoom, isLoaded, isWaiting } = storeToRefs(userStore)

function signOut() {
	location.reload()
	useAuth().signOut()
}

onBeforeMount(async () => {
	try {  await userStore.load() }
	catch { router.push('/signup') }
})

</script>

<template>


	<div v-if="isLoaded">


		<!-- <Room v-if="inTheRoom" />-->
		<div v-if="inTheRoom">
			In The Room
		</div>

		<Lobby v-else-if="isWaiting" />

		<div v-else>
			Username: {{ user?.username }} 
			<button @click="signOut" style="float: right"> Sign out </button>
		</div>
		
	</div>

	
</template>


<style lang="scss">

.home {
	@include flex();
	gap: 30px;
	height: 100vh;
	width: 100%;
}

</style>