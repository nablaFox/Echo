<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onLongPress, onClickOutside } from '@vueuse/core'
import { useFormat } from '@/composables/format'
import dayjs from 'dayjs'

const props = defineProps<{
    origin: string
    text: string
    date: Date
    prevDate: Date | null
    menuDisabled: boolean,
    username: string
}>()

const emit = defineEmits<{
    (e: 'delete'): void
}>()

const format = useFormat()
const container = ref<HTMLElement | null>(null)
const menu = ref(false)

const isFromSender = computed(() => props.origin === 'sender')

const isDivider = computed(() => {
    const date = dayjs(props.date)
    if (!props.prevDate) { return true }
    return Math.round(date.diff(props.prevDate, 'day', true)) > 0
})

onLongPress(
    container,
    () => { isFromSender.value && !menu.value && (menu.value = true) },
    { delay: 200 }
)

onClickOutside(container, () => (menu.value = false))

function onDelete() {
    menu.value = false
    emit('delete')
}
</script>


<template>

    <div
        class="message__container"
        :class="origin"
        :style="{ zIndex: menu ? 2 : undefined }"
    >
        <div 
            ref="container"
            class="message" 
            @touchend.prevent
        >
            <Transition>
                <div
                    v-if="menu && !menuDisabled"
                    class="menu"
                >
                    <div 
                        class="menu__item" 
                        @touchend.stop.prevent="onDelete"
                    > 
                        Delete 
                    </div>
                </div>
            </Transition>

            <div class="message__content">
                <div
                    v-if="!isFromSender"
                    class="username"
                >
                   {{ username }}
                </div>
                <div class="text">
                    {{ text }}
                </div>
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
}

.username {
    @extend %label-large;
    color: var(--md-sys-color-primary)
}

.text { word-wrap: break-word }

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
    height: 60px;
    left: 0;
    z-index: -1;
    color: var(--md-sys-color-on-surface);
    top: -40px;
    overflow: hidden;
    min-width: 60px;
    padding: 10px 0 0 5px;
    
}

.divider {
    width: 50%;
    height: fit-content;
    margin: 15px 0;
    @include flex($justify: center);
    background-color: var(--md-sys-color-surface1);
    color: var(--md-sys-color-on-surface-variant);
    border-radius: $medium-rounded;
    align-self: center;
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