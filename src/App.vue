<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { useEventListener } from '@vueuse/core'

const resize = () => document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)
useEventListener(window, 'resize', resize)
resize()

useDark({ valueLight: 'light' })

if ("virtualKeyboard" in navigator) {
  (navigator as any).virtualKeyboard.overlaysContent = true
}
</script>

<template>

  	<RouterView v-slot="{ Component, route }">
		<Transition :name="route.meta.transition as string || 'fade'">
			<component :is="Component" />
		</Transition>
	</RouterView>

</template>

<style lang="scss">

.fade-enter-active,
.fade-leave-active {
	position: absolute; // avoiding overlap
	width: 100%;
	height: 100%;
	transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  	opacity: 0;
}

.blur-enter-active,
.blur-leave-active {
    transition: all 0.4s
}

.blur-enter-from,
.blur-leave-to {
    opacity: 0; 
    filter: blur(1rem);
}

</style>