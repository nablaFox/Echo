<script setup lang="ts">
import { provide, ref, readonly } from 'vue'

import ActionBar from '@/components/navigation/ActionBar.vue'
import BottomAppBar from '@/components/navigation/NavigationBar.vue'

const isBottomBar = ref(true)

const hideBottomBar = () => isBottomBar.value = false
const showBottomBar = () => isBottomBar.value = true

provide('bottomBar', {
    isVisible: readonly(isBottomBar),
    hideBottomBar,
    showBottomBar
})
</script>


<template>
    <div class="main-layout">
		<ActionBar />
        <slot />
        <BottomAppBar v-if="isBottomBar "/>
    </div>
</template>



<style lang="scss">
.main-layout {
    padding: 10px 16px;
    @include flex($direction: column);
}
</style>