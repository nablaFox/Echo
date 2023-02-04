<script setup lang="ts">

import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'

</script>


<template>

    <Splide 
        :options="{ 
            arrows: false, 
            fixedWidth: 'auto',
            gap: '10px',
            width: '100%',
            pagination: false,
        }" 
        aria-label="My Favorite Images"
    >
        <SplideSlide
            v-for="n in 10"
        >
            <div class="recent">
                <span class="name"> New Room </span>
                <span class="time"> #34h </span>
            </div>
        </SplideSlide>
    </Splide>

</template>

<style lang="scss" scoped>
.splide {
    border-top: 1px solid var(--md-sys-color-outline-variant);
	border-bottom: 1px solid var(--md-sys-color-outline-variant);
    padding: 18px 20px;
    @include maxHSize(719px) { padding: 13px 20px; }
}

.recent {
    @include flex();
    gap: 4px;
    background-color: var(--md-sys-color-surface1);
    border-radius: $small-rounded;
    @extend %label-medium;
    height: 40px;
    padding: 0 10px;
    @include maxHSize(719px) { height: 32px }
}

.time { color: var(--md-sys-color-primary) }
</style>