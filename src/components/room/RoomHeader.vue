<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useFormat } from '@/composables/format'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import ToolTip from '@/components/containment/ToolTip.vue'
import Menu from '../selection/Menu.vue'
import Editor from '../actions/Editor.vue'
import Icon from '../actions/Icon.vue'

const props = defineProps<{
    roomName: string,
    since: Date,
    totalTime?: number
}>()

const emit = defineEmits<{
    (e: 'updateName', name: string): void,
}>()

const userStore = useUser()
const format = useFormat()
const router = useRouter()

const clock = ref<number>(0)
const formatted = format.room(clock)
const isClosed = computed(() => props.totalTime ? true : false)
const editor = ref<InstanceType<typeof Editor> | null>(null)

const menuItems = [
    { content: 'Edit', task: onEdit },
    { content: 'Leave', task: onLeave }
]

function onEdit() { editor.value?.triggerEdit() }

async function onLeave() {
    const result = await userStore.leaveRoom()
    if (!result) { alert('Something went wrong!') }
}

function updateDiff() {
    const now = dayjs()
    clock.value = now.diff(props.since)
}

const interval = setInterval(updateDiff, 1000)

watch(props, now => {
    if (now.totalTime) {
        clearInterval(interval)
        clock.value = now.totalTime
    }
}, { immediate: true })
</script>

<template>

    <div class="room-header">
        <div class="content">
            <div class="left">
                <Icon
                    v-if="isClosed"
                    icon="arrow_back"
                    @click="router.back()"
                />
                <Editor
                    class="name"
                    ref="editor"
                    fallback="New Room"
                    :edit-on-click="false"
                    :initial-value="roomName"
                    :max-input="60"
                    @edit="edit => emit('updateName', edit)"
                />
            </div>
            
            <div class="right">
                <ToolTip :tip="formatted">
                    <span class="material-icons schedule">
                        schedule
                    </span>
                </ToolTip>
                <Menu
                    width="150px"
                    :gap="20"
                    :items="menuItems"
                    :blocked="isClosed"
                />
            </div>
        </div>
        <div class="curtain"></div>
    </div>
 
</template>


<style lang="scss" scoped>
.room-header {
    @include flex($direction: column);
    background-color: var(--md-sys-color-background);
}

.content {
    background-color: var(--md-sys-color-background);
    @include flex($justify: space-between);
    width: 100%;
    height: 65px;
    line-height: 0;
}

.left {
    @include flex($justify: start);
    gap: 10px;
    margin-right: 15px;
    width: 100%;
}

.name { @extend %title-large; }

.right {
    @include flex();
    gap: 5px;
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

.curtain::after {
    display: block;
    content: "";
    position: absolute;
    right: 0;
    bottom: -28px;
    width: 100%;
    height: 28px;
	background: linear-gradient(var(--md-sys-color-background),transparent 70%);
}
</style>