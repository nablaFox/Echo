<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const router = useRouter()
const user = useCurrentUser()
</script>

<template>

	<div class="action-bar">
		<div class="product"> Echo </div>
		<img
			class="profile"
			:src="user?.photoURL || ''" 
			referrerpolicy=“no-referrer”
			@click="router.push('/profile')"
		>
	</div>
	
</template>


<style lang="scss" scoped>
.action-bar {
	width: 100%;
	background-color: var(--md-sys-color-surface1);
	@include flex($justify: space-between);
	border-radius: 8px;
	padding: 0 10px;
	height: 56px;
	@include maxHSize(719px) { height: 52px };
	line-height: 0;
}

.product { @extend %title-large }

.profile {
	width: 30px;
	border-radius: $full-rounded;
	background-position: center;
	background-size: cover;
}
</style>