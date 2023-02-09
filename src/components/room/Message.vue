<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useFormat } from '@/composables/format'
import { onLongPress } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'

const props = defineProps<{
    origin: string
    text: string
    date: Date
    prevDate: Date | null
    menuDisabled: boolean
}>()
const emit = defineEmits<{
    (e: 'update', text: string): void,
    (e: 'delete'): void
}>()

const format = useFormat()
const container = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const isFromSender = computed(() => props.origin === 'sender')
const edit = ref(false)
const menu = ref(false)
const editText = ref('')

onLongPress(
    container,
    () => { isFromSender.value && (menu.value = true) },
    { delay: 200 }
)

onClickOutside(
    container,
    () => {
        menu.value = false
        if (edit.value) { 
            emit('update', editText.value)
            edit.value = false
        }
    }
)

const isDivider = computed(() => {
    const date = dayjs(props.date)
    if (!props.prevDate) { return true }
    return Math.round(date.diff(props.prevDate, 'day', true)) > 0
})

function onDelete() {
    menu.value = false
    emit('delete')
}

function onEdit() {
    menu.value = false
    edit.value = true
    setTimeout(() => content.value?.focus(), 0)
}
</script>


<template>

    <div
        class="message__container"
        :class="origin"
        :style="{ zIndex: menu ? 2 : undefined }"
    > 
        <div class="message" ref="container">
            <Transition>
                <div class="menu" 
                    v-if="menu && !menuDisabled"
                >
                    <div class="menu__item" @click="onEdit"> Edit </div>
                    <div class="menu__item" @click="onDelete"> Delete </div>
                </div>
            </Transition>
            <div
                @focus="e => editText = (e.target as HTMLElement).innerText"
                @input="e => editText = (e.target as HTMLElement).innerText"
                class="message__content"
                :contenteditable="isFromSender && edit"
                ref="content"
            >
                {{ text }} 
            </div>
            <div class="message__date">
                {{ format.timestamp(date) }}
            </div>
        </div>
    </div>

    <div class="divider" v-if="isDivider">
        <span class="divider__content"> 
            {{ format.divider(date) }}
        </span>
    </div>

</template>


<style lang="scss" scoped>
.message__container {
    width: 100%;
    @include flex($justify: start);
    padding: 0 8px;
    position: relative;
}

.message {
    border-radius: 16px 16px 16px 4px;
    padding: 6px 50px 9px 9px;
    position: relative;
    max-width: 88%;
    @extend %body-large;
    font-size: 17.4px;
    line-height: 1.2;
    user-select: none;
   
}

.message__content { word-wrap: break-word }

.message__date {
    position: absolute;
    @extend %label-small;
    right: 10px;
    bottom: 4px;
}

.sender {
    .message { 
        border-radius: 16px 16px 4px 16px;
        background-color: var(--md-sys-color-tertiary-container);
        color: var(--md-sys-color-on-tertiary-container);
        margin-left: auto;
    }

    .message__date { 
        color: var(--md-sys-color-on-tertiary-container) 
    }

    .message { flex-direction: row-reverse }
}

.recipient {
    .message { 
        background-color: var(--md-sys-color-surface5);
    }
    .message__date { 
        color: var(--md-sys-color-on-surface-variant);
    }
}

.menu {
    position: absolute;
    background-color: var(--md-sys-color-surface1);
    font-size: 15.8px;
    font-weight: 500;
    border-radius: $small-rounded;
    width: 80%;
    height: 75px;
    left: 0;
    z-index: -1;
    color: var(--md-sys-color-on-surface);
    top: -55px;
    padding: 8px;
    overflow: hidden;
    min-width: 60px;
}

.divider {
    width: 50%;
    height: fit-content;
    margin: 15px 0;
    @include flex($justify: center);
    background-color: var(--md-sys-color-surface1);
    opacity: .8;
    border-radius: $medium-rounded;
    align-self: center;
    user-select: none;
    z-index: 1;
}

.divider__content {
    @extend %label-large;
    font-size: 15px;
    padding: 3px 0;
}

.v-enter-active {
    transform-origin: 0 100%;
    transition: all .25s;
    transform: scaleY(1);
}

.v-enter-from { transform: scaleY(0) }
</style>