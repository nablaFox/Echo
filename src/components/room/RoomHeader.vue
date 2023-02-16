<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFormat } from '@/composables/format'
import { useUser } from '@/stores/user'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'

import ToolTip from '@/components/containment/ToolTip.vue'
import Menu from '../selection/Menu.vue'
import IconButton from '../actions/IconButton.vue'

const props = defineProps<{
    roomName: string,
    since: Date,
    totalTime?: number
}>()

const emit = defineEmits<{
    (e: 'edit', name: string): void,
}>()

const userStore = useUser()
const format = useFormat()
const router = useRouter()
const clock = ref<number>(0)
const formatted = format.room(clock)
const isClosed = computed(() => props.totalTime ? true : false)
const nameTarget = ref<HTMLInputElement | null>(null)
const edit = ref(false)
const inputName = ref('')

const menuItems = [
    { content: 'Edit', task: onEdit },
    { content: 'Leave', task: onLeave }
]

function onEdit() {
    edit.value = true
    setTimeout(() => nameTarget.value!.focus(), 0)
    const end = inputName.value.length
    nameTarget.value?.setSelectionRange(end, end)
}

async function onLeave() {
    const result = await userStore.leaveRoom()
    if (!result) { alert('Something went wrong!') }
}

onClickOutside(nameTarget, () => {
    if (edit.value) {
        const msg = /[a-zA-Z]/.test(inputName.value) ? 
            inputName.value : 'New Room'
        inputName.value = msg
        nameTarget.value!.scrollLeft = 0
        edit.value = false
        emit('edit', msg)
    }
})

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

    inputName.value = now.roomName
}, { immediate: true })
</script>

<template>

    <header class="room-header">
        <div class="content">
            <div class="left">
                <span
                    v-if="isClosed"
                    @click="router.push('/')"
                    class="material-icons exit"
                > 
                    arrow_back
                </span>
                <textarea 
                    class="name"
                    ref="nameTarget"
                    rows="1"
                    :readonly="!edit"
                    :value="inputName"
                    @input="e => inputName = (e.target as HTMLInputElement).value"
                    @keydown.enter.prevent
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
                    :items="menuItems"
                    :gap="20"
                    :blocked="isClosed"
                >
                    <IconButton 
                        icon="more_vert" 
                        as="span"
                        :style="{ pointerEvents: isClosed ? 'none' : 'all' }"
                    />
                </Menu>
            </div>
        </div>
        <div class="curtain"></div>
    </header>
 
</template>


<style lang="scss" scoped>
.room-header {
    @include flex($direction: column);
    width: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 5px 10px;
    user-select: none;
    background-color: var(--md-sys-color-background);
}

.content {
    @include flex($justify: space-between);
    width: 100%;
    height: 60px;
    line-height: 0;
}

.left {
    @include flex($justify: start);
    gap: 10px;
    margin-right: 15px;
    width: 100%;
}

.name { 
    @extend %title-large;
    width: 70%;
    user-select: none;
    resize: none;
    padding: 0;
    white-space: nowrap;
    @include hide-scrollbar();
    width: 80%;
}

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