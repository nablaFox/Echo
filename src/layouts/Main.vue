<script setup lang="ts">
import { provide, ref, readonly } from 'vue'

import StackLayout from './StackLayout.vue'
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

    <StackLayout 
        footer-fixed
        header-padding="10px 0 0 0"
    >
        <template #header>
            <ActionBar />
        </template>

        <slot />

        <template #footer>
            <BottomAppBar v-if="isBottomBar "/>
        </template>
    </StackLayout>

</template>