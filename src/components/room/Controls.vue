<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core'
import IconButton from '@/components/actions/IconButton.vue'

const emit = defineEmits<{
    (e: 'send', msg: string): void,
    (e: 'godown'): void
}>()
defineProps<{ 
    disabled: boolean,
    goDownBtn: boolean
}>()

const { textarea, input, triggerResize } = useTextareaAutosize()
const disabledMsg = 'The room is closed'

function send(e: Event) {
    e.preventDefault()
    input.value && emit('send', input.value)
    textarea.value.style.height="auto"
    input.value = ''
    setTimeout(triggerResize, 0)
}
</script>


<template>

    <footer 
        class="controls"
        :class="{ disabled: disabled }"
    >
        <IconButton 
            v-if="goDownBtn"
            class="go-down"
            icon="keyboard_arrow_down"
            variant="tonal"
            @click="emit('godown')"
        />
        <div class="content">
            <div class="textarea__wrapper">
                <textarea
                    ref="textarea"
                    class="textarea"
                    rows="1"
                    :placeholder="disabled ? disabledMsg : 'Aa'"
                    :value="input"
                    @input="e => input = (e.target as HTMLInputElement).value"
                    @keydown.enter="send"
                ></textarea>
            </div>

            <div class="leading">
                <IconButton icon="mood" />
            </div>
        </div>

        <div class="trailing">
            <IconButton
                v-if="!input"
                icon="music_note" 
                variant="tonal" 
            />
            <IconButton
                v-else
                icon="send"
                icon-variant="round"
                variant="tonal"
                @click="send"
                @touchend.prevent="send"
            />
        </div>
    </footer>

</template>


<style lang="scss" scoped>
.controls {
    width: 100%;
    display: flex;
    gap: 5px;
    background-color: var(--md-sys-color-surface);
    padding: 5px 8px;
    bottom: 0;
    &.disabled {
        .trailing,
        .content { 
            opacity: .7;
            pointer-events: none; 
        }
    }
    position: relative;
}

.go-down {
    background-color: var(--md-sys-color-surface);
    box-shadow: var(--md-sys-elevation1);
    position: absolute;
    right: 10px;
    top: -28px;
    opacity: 1;
    z-index: 9999;
    font-size: 10px!important;
    padding: 0;
}

.trailing {
    display: flex;
    align-items: flex-end;
    position: relative;
    gap: 5px;
}

.content {
    display: flex;
    align-items: flex-end;
    width: 100%;
    border-radius: $extra-large-rounded;
    background-color: var(--md-sys-color-surface5);
    padding-left: 10px;
    box-sizing: content-box;
    padding-right: 10px;
}

.textarea__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px 5px;
}

.textarea {
    resize: none;
    padding: 0px 0;
    max-height: 100px;
    scrollbar-width: thin;
    color: var(--md-sys-color-on-surface);
    @include hide-scrollbar()
}
</style>