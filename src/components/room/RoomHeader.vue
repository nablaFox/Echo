<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFormat } from '@/composables/format'
import { useUser } from '@/stores/user'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'

import ToolTip from '@/components/containment/ToolTip.vue'
import Menu from '../selection/Menu.vue'

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
        emit('edit', msg)
    }
    edit.value = false
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

    <div class="room-header">
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

.name { 
    @extend %title-large;
    padding: 0;
    white-space: nowrap;
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