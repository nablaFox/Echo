<script setup lang="ts">
import StackLayout from './StackLayout.vue'
import ActionBar from '@/components/navigation/ActionBar.vue'
import BottomAppBar from '@/components/navigation/NavigationBar.vue'
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
            <BottomAppBar />
        </template>
    </StackLayout>

</template>