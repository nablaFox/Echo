<script setup lang="ts">
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>

	<div class="action-bar">
		<div class="product"> Echo </div>
		<RouterLink to="/profile">
			<img
				class="profile"
				:src="user?.photoURL || ''" 
				referrerpolicy=“no-referrer”
			>
		</RouterLink>
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