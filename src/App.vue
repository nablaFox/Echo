<script setup lang="ts">
</script>

<template>

  	<RouterView v-slot="{ Component, route }">
		<component :is="route.meta.layout">
			<component :is="Component"></component>
		</component>
	</RouterView>

</template>



<style lang="scss">
</style>