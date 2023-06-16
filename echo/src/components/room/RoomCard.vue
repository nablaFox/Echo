<script setup lang="ts">
import { useFormat } from '@/composables/format'

import Icon from '@/components/actions/Icon.vue'

defineProps<{
    name: string
    date: Date
    members: number
    totalTime: number
    id: string
}>()

const { fullDateVerbose, preview } = useFormat()
</script>

<template>

    <RouterLink :to="`/room/${id}`">
        <div class="room-card">
            <div class="top">
                <div class="name"> {{ name }} </div>
                <h5 class="date"> {{ fullDateVerbose(date) }} </h5>
            </div>
            <div class="bottom">
                <div class="info"> 
                    <Icon icon="person" />
                    {{ members }} Members
                </div>
                <div class="info">
                    <Icon icon="schedule" />
                    {{ preview(totalTime) }}
                </div>
            </div>
        </div>
    </RouterLink>

</template>


<style lang="scss" scoped>
.room-card {
    background-color: var(--md-sys-color-surface1);
    border-radius: $medium-rounded;
    padding: 20px;

    & > .bottom { margin-top: 20px; }
}

.name {
    @extend %headline-medium;
    font-size: 26px;
    color: var(--md-sys-color-primary);
    margin-bottom: 8px;
    word-break: normal;
    word-wrap: break-word;
    line-height: 1!important;
}

.info {
    @include flex($justify: start, $align: center);
    gap: 10px;
    font-size: 18px;
    padding: 7px 0;
}
</style>