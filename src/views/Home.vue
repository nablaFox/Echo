<script setup lang="ts">

import { useAuth } from '@/composables/auth';
import { useUser } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUser()
const { user, inTheRoom, isLoaded } = storeToRefs(userStore)

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
	
		Username: {{ user?.username }} 
		<button @click="signOut" style="float: right"> Sign out </button>
		<div v-if="!inTheRoom" class="home">
			<RouterLink to="/Lobby"> Lobby </RouterLink>
		</div>

		<template v-else>
			Room component

			<button @click="userStore.leaveRoom"> Leave room </button>
		</template>
		
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