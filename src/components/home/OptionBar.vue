<script setup lang="ts">

import Languages from './Languages.vue'
import Modes from './Modes.vue'
import Settings from './Settings.vue'

</script>


<template>

    <div class="option-bar">
        <Modes />
        <Languages />
        <Settings />
    </div>


</template>

<style scoped lang="scss">
.option-bar {
    @include flex($direction: column, $justify: space-between);
    display: inline-flex;
    background-color: var(--md-sys-color-surface1);
    box-shadow: var(--md-sys-elevation2);
    border-radius: $small-rounded;
    height: 265px;
    width: 42px;
    padding: 12px 0px;

    @include maxHSize(719px) { height: 212px }
}
</style>