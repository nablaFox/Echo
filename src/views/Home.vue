<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'
import { storeToRefs } from 'pinia'

import Main from '@/layouts/Main.vue'
import MainButton from '@/components/home/MainButton.vue'
import OptionBar from '@/components/home/OptionBar.vue'
import UserInfo from '@/components/home/UserInfo.vue'
import Recents from '@/components/home/Recents.vue'

const router = useRouter()
const userStore = useUser()
const { roomInfo, exRooms } = storeToRefs(userStore)

async function onMainClick() {
	const result = await userStore.searchRoom()
	if (!result) { 
		return alert('Something went wrong!')
	}
	router.push({ name: 'Lobby' })
}
</script>

<template>

	<Main>
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
	</Main>

</template>


<style lang="scss" scoped>
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