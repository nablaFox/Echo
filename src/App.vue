<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const resize = () => document.documentElement.style.setProperty('--full-vh', `${window.innerHeight}px`)
resize()
useEventListener(window, 'resize', resize)

if ("virtualKeyboard" in navigator) {
  (navigator as any).virtualKeyboard.overlaysContent = true
}
</script>

<template>

  	<RouterView v-slot="{ Component, route }">
		<component :is="route.meta.layout">
			<component :is="Component"></component>
		</component>
	</RouterView>

</template>