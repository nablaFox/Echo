<script setup lang="ts">

import { ref } from 'vue'
import NavSegment from './NavSegment.vue'

const destinations = [
	{ icon: 'graphic_eq', href: '/', id: 0 },
	{ icon: 'access_time', href: '/exRooms', id: 1}
]

const selected = ref(0)

</script>

<template>

	<div class="bottom-app-bar">
		<NavSegment
			v-for="dest in destinations"
			:icon="dest.icon"
			:class="{ active: selected === dest.id }"
            @select="selected = dest.id"
		/>
	</div>

</template>


<style lang="scss">
.bottom-app-bar {
	@include pos($b: 0, $l: 0);
	position: fixed;
	@include flex();
	width: 100%;
	height: 60px;
	z-index: 9995;
	background-color: var(--md-sys-color-surface2);
	gap: 40px;
	@include maxHSize(719px) { height: 48px }
}
</style>