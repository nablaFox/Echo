<script setup lang="ts">
import { provide, ref, readonly } from 'vue'

import ActionBar from '@/components/navigation/ActionBar.vue'
import BottomAppBar from '@/components/navigation/NavigationBar.vue'

const isActionBar = ref(true)
const isBottomBar = ref(true)

const hideActionBar = () => isActionBar.value = false
const hideBottomBar = () => isBottomBar.value = false

const showActionBar = () => isActionBar.value = true
const showBottomBar = () => isBottomBar.value = true

provide('setFullScreen', () => {
    hideActionBar()
    hideBottomBar()
})

provide('disableFullScreen', () => {
    showActionBar()
    showBottomBar()
})

provide('actionBar', {
    isVisible: readonly(isActionBar),
    hideActionBar,
    showActionBar
})

provide('bottomBar', {
    isVisible: readonly(isBottomBar),
    hideBottomBar,
    showBottomBar
})

</script>


<template>
    <div class="main-layout">
		<ActionBar v-if="isActionBar"/>
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