<script setup lang="ts">
import { useFormat } from '@/composables/format';
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'

defineProps<{ rooms: Array<any> }>()

const format = useFormat()
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
        <SplideSlide v-for="room in rooms">
            <RouterLink 
                class="recent"
                :to="`/room/${room.ref.id}`"
            >
                <span class="name"> {{ room.ref.name }} </span>
                <span class="time"> 
                    #{{ format.preview(room.ref.info.totalTime) }} 
                </span>
            </RouterLink>
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
    gap: 4px;
    background-color: var(--md-sys-color-surface1);
    border-radius: $small-rounded;
    @extend %label-medium;
    padding: 15px 10px;
    line-height: 1!important;
    display: block;
    @include maxHSize(719px) { padding: 10px 10px }
}

.time { color: var(--md-sys-color-primary) }

.name {
    @include text-overflow(100px);
    display: inline-block;
}
</style>