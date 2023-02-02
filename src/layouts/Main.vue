<script setup lang="ts">

import ActionBar from '@/components/navigation/ActionBar.vue'
import BottomAppBar from '@/components/navigation/NavigationBar.vue'


</script>


<template>
    <div class="main-layout">
		<ActionBar />
        <slot />
        <BottomAppBar />
    </div>
</template>



<style lang="scss">

.main-layout {
    padding: 0 16px;
    @include flex($direction: column);
}

</style>