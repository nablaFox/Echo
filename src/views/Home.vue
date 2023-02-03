<script setup lang="ts">

import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

import Lobby from '@/components/Lobby.vue'
import MainButton from '@/components/app/MainButton.vue'
import OptionBar from '@/components/app/OptionBar.vue'
import UserInfo from '@/components/app/UserInfo.vue'
import Recents from '@/components/app/Recents.vue'

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
		<div class="functions">
			<MainButton />
			<OptionBar />
		</div>

		<div class="info-wrapper">
			<UserInfo 
				:hours="roomInfo?.totalHours || 0"
				:peoples="roomInfo?.totalPeoples || 0"
				:rooms="roomInfo?.totalRooms || 0"
			/>
		</div>

		<div class="recents-wrapper">
			<h2 class="title"> Recents </h2>
			<div class="recents-container">
				<Recents />
			</div>
		</div>
	</main>

</template>


<style lang="scss" scoped>

.home {
	height: calc(100vh - 66px - 60px);
	width: 100%;
	@include flex($direction: column, $justify: start);
	& > * { width: 100%; }

	@include maxHSize(719px) { height: calc(100vh - 54.8px - 48px) }
}

.functions {
	flex: 60%;
	@include flex();
	gap: 40px;
}

.info-wrapper {
	flex: 18%;
	padding: 0 15px;
}

.recents-wrapper { 
	flex: 22%;
	display: flex;
	flex-direction: column;
}

.recents-container { 
	flex: 1; 
	@include flex();
	padding-bottom: 10px;
}

</style>