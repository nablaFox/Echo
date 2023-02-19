<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTextareaAutosize } from '@vueuse/core';

export interface Props {
    maxInput: number
    initialValue?: string
    autoGrow?: boolean
    fallback?: string
    rangeVisible?: boolean
    editOnClick?: boolean
    width?: string
}

const props = withDefaults(defineProps<Props>(), {
    editOnClick: true
})

const emit = defineEmits<{
    (e: 'edit', edit: string): void
}>()

const { textarea, input, triggerResize } = useTextareaAutosize()
input.value = props.initialValue || ''
const edit = ref(false)

const inRange = computed(() => input.value?.length < props.maxInput)

function triggerEdit() {
    edit.value = true
    if (props.editOnClick) return
    setTimeout(() => textarea.value!.focus(), 0)
    const end = input.value.length
    setTimeout(() => {
        textarea.value!.selectionStart = textarea.value!.selectionEnd = end
    }, 0)
}

onClickOutside(textarea, () => {
    if (edit.value) {
        input.value = /[a-zA-Z]/.test(input.value) ? 
            input.value : props.fallback || ''
        
        textarea.value!.scrollLeft = 0
        setTimeout(triggerResize, 0)
        emit('edit', input.value)
    }
    edit.value = false
})

function onInput(e: KeyboardEvent) {
    if (!inRange.value && e.key !== 'Backspace') {
        e.preventDefault()
    }
}

watch(
    props,
    now => now.initialValue && (input.value = now.initialValue)
)

defineExpose({ triggerEdit })
</script>


<template>

    <div class="editor">
        <textarea
            ref="textarea"
            rows="1"
            :value="input"
            :class="['textarea', autoGrow && 'auto-grow']"
            :style="{ width: rangeVisible ? '80%' : width }"
            :readonly="!edit"
            @click="editOnClick && triggerEdit()"
            @keydown="onInput"
            @input.prevent="e => input = (e.target as HTMLInputElement).value"
            @keydown.enter.prevent
        />

        <div
            v-if="edit && rangeVisible"
            :class="['control', autoGrow && 'down']"
        >
            {{ input.length }} / {{ maxInput }}
        </div>

        <!-- errors (maxSize and mininum )-->
    </div>

</template>


<style lang="scss" scoped>
.editor {
    width: 100%;
    position: relative;
    @include flex($justify: start);
}

.textarea {
    white-space: nowrap;
    
    &.auto-grow {
        white-space: normal;
        line-height: 1.4;
    }
}

.control { 
    @extend %label-medium;
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);

    &.down {
        bottom: 0;
        transform: unset;
    }
}
</style>