<script setup lang="ts">

import { useAuth } from '@/composables/auth'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

import Lobby from '@/components/Lobby.vue'
import MainButton from '@/components/app/MainButton.vue'
import OptionBar from '@/components/app/OptionBar.vue'
import UserInfo from '@/components/app/UserInfo.vue'
import ListItem from '@/components/containment/ListItem.vue'
import ActionBar from '@/components/navigation/ActionBar.vue'

const userStore = useUser()
const { inTheRoom, isWaiting, roomInfo, user } = storeToRefs(userStore)

</script>

<template>

	<div v-if="inTheRoom" > 
		in the room
		<button @click="userStore.leaveRoom"> Leave room </button> 
		
	</div>

	<Lobby v-else-if="isWaiting" />

	<main class="home" v-else>
		Not in the room {{ user }}
	</main>


</template>


<style lang="scss">
</style>