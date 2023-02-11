<script setup lang="ts">
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

import MainButton from '@/components/home/MainButton.vue'
import OptionBar from '@/components/home/OptionBar.vue'
import UserInfo from '@/components/home/UserInfo.vue'
import Recents from '@/components/home/Recents.vue'
import { useRouter } from 'vue-router'

const userStore = useUser()
const router = useRouter()
const { roomInfo, exRooms } = storeToRefs(userStore)
userStore.exRoomsLimit = 10

async function onMainClick() {
	const result = await userStore.searchRoom()
	if (result) { router.push('/lobby') }
	else { } // do something
}

</script>

<template>

	<main class="home">
		<div class="functions">
			<MainButton @click="onMainClick"/>
			<OptionBar />
		</div>

		<div class="info-wrapper">
			<UserInfo
				:hours="roomInfo?.totalTime || 0"
				:peoples="roomInfo?.totalPeoples || 0"
				:rooms="roomInfo?.totalRooms || 0"
			/>
		</div>

		<div class="recents-wrapper" v-if="exRooms.length > 1">
			<h2 class="recents__title"> Recents </h2>
			<div class="recents__container">
				<Recents :rooms="exRooms"/>
			</div>
		</div>

	</main>

</template>


<style lang="scss" scoped>
.home {
	height: calc(var(--full-vh) - 66px - 60px);
	width: 100%;
	@include flex($direction: column, $justify: start);
	& > * { width: 100%; }
	@include maxHSize(719px) { height: calc(var(--full-vh) - 54.8px - 48px) }
}

.functions {
	flex: 56%;
	@include flex();
	gap: 40px;
}

.info-wrapper {
	flex: 20%;
	padding: 0 15px;
}

.recents-wrapper { 
	flex: 24%;
	display: flex;
	flex-direction: column;
	&__title { 
		@extend %title-large;
		@include maxHSize(650px) {  
			font-weight: 500;
    		font-size: 18px
		}
	}
}

.recents__container { 
	flex: 1; 
	@include flex();
	padding-bottom: 10px;
}

.recents__title {
	@extend %title-medium;
	font-size: 18px
}
</style>