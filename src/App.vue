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
		<component :is="route.meta.layout || 'div'">
			<component :is="Component" />
		</component>
	</RouterView>

</template>