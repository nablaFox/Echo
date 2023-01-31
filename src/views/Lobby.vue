<script setup lang="ts">

import { useUser } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUser()
const { isWaiting } = storeToRefs(userStore)

</script>


<template>

    <div v-if="!isWaiting">
        <button @click="userStore.searchRoom"> Search room </button>
    </div>

    <div v-else> Searching... </div>
    
</template>


<style lang="scss">
</style>