<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFormat } from '@/composables/format'
import dayjs from 'dayjs'

import ToolTip from '@/components/containment/ToolTip.vue'

const props = defineProps<{
    roomName: string,
    since: Date,
    totalTime: number
}>()

const format = useFormat()
const router = useRouter()
const clock = ref<number>(0)
const formatted = format.room(clock)
const isClosed = computed(() => props.totalTime ? true : false)

function updateDiff() {
    const now = dayjs()
    clock.value = now.diff(props.since)
}

const interval = setInterval(updateDiff, 1000)

watch(props, now => {
    if (now.totalTime) {
        clearInterval(interval)
        clock.value = props.totalTime
    }
}, { immediate: true })


</script>

<template>

    <header class="room-header">
        <div class="content">
            <span
                v-if="isClosed"
                @click="router.push('/')"
                class="material-icons exit" 
            > 
                arrow_back
            </span>
            <div class="name"> {{ roomName }} </div>
            <div class="trailing">
                <ToolTip :tip="formatted">
                    <span class="material-icons schedule">schedule</span>
                </ToolTip>
                <span class="material-icons">more_vert</span>
            </div>
        </div>
    </header>
 
</template>


<style lang="scss" scoped>
.room-header {
    @include flex($direction: column);
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 5px 10px;
    user-select: none;
}

.content {
    @include flex($justify: start);
    width: 100%;
    height: 60px;
    line-height: 0;
    gap: 10px;
}

.name { 
    @extend %title-large;
    width: 100%
}

.trailing {
    @include flex();
    gap: 10px;
}

.schedule {
    background-color: var(--md-sys-color-surface1);
    border-radius: $medium-rounded;
    padding: 3px;
    color: var(--md-sys-color-primary);
}

:deep(.tip) { 
    padding: 10px;
    bottom: -38px;
}
</style>