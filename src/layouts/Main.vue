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

// add props such as height
</script>


<template>
    <div class="main-layout">
		<ActionBar />
        <main class="main">
            <slot />
        </main>
        <BottomAppBar v-if="isBottomBar "/>
    </div>
</template>



<style lang="scss">
.main-layout {
    padding: $page-padding;
    @include flex($direction: column);
    justify-content: start;
}

.main {
    width: 100%;
}

</style>