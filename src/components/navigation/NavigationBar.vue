<script setup lang="ts">
import { useRoute } from 'vue-router'
import NavSegment from './NavSegment.vue'

const route = useRoute()

const destinations = [
	{ icon: 'graphic_eq', href: '/' },
	{ icon: 'access_time', href: '/exRooms' }
]
</script>

<template>
	
	<div class="bottom-app-bar">
		<NavSegment
			v-for="dest in destinations"
			:href="dest.href"
			:icon="dest.icon"
			:class="{ active: route.fullPath === dest.href }"
		/>
	</div>

</template>


<style lang="scss">
.bottom-app-bar {
	@include flex();
	height: 60px;
	background-color: var(--md-sys-color-surface2);
	gap: 40px;
	@include maxHSize(719px) { height: 48px }
}
</style>