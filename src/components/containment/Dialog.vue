<script setup lang="ts">
import MdButton from '@/components/actions/MdButton.vue'
import { ref } from 'vue'

defineProps<{
    actions?: string[]
    icon?: string
    headline?: string
    divider?: boolean
    supportingText?: string
}>()
const emit = defineEmits(['confirm', 'cancel'])

const active = ref(false)

const open = () => (active.value = true)
const close = () => (active.value = false)

defineExpose({ open, close })
</script>


<template>

    <Transition>
        <div class="mask" v-if="active">
            <form class="dialog" @submit.prevent>
                <div
                    class="content"
                    :style="{ alignItems: icon ? 'center' : 'start' }"
                >
                    <div 
                        class="icon material-icons"
                        v-if="icon"
                    >
                        {{ icon }}
                    </div>

                    <h4 class="headline"> {{ headline }} </h4>

                    <div 
                        class="supporting-text"
                        v-if="supportingText"
                    >
                        {{ supportingText }}
                    </div>

                    <div 
                        class="body"
                        :class="{ 'w-divider': divider }"
                    >
                        <slot />
                    </div>
                </div>

                <div class="actions" v-if="actions">
                    <MdButton
                        variant="text" 
                        :label="actions[0]"
                        @click="emit('cancel'); close()"
                    />
                    <MdButton 
                        variant="text" 
                        :label="actions[1]"
                        @click="emit('confirm'); close()"
                    />
                </div>
            </form>
        </div>
    </Transition>
   
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
    transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
 
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9901;
    background-color: #00000066;
    @include flex()
}

.dialog {
    border-radius: $extra-large-rounded;
    width: 70vw; // temporany
    background-color: var(--md-sys-color-surface);
    box-shadow: var(--md-sys-elevation2);
    padding: 24px;
}

.actions {
    @include flex($justify: end);
    gap: 8px;
}

.content { 
    @include flex($direction: column);
    gap: 16px;
    padding-bottom: 24px;
}

.supporting-text { margin-bottom: 8px }

.body {
    width: 100%;
    &.w-divider {
        border-color: var(--md-sys-color-outline-variant);
        border-width: 1px 0 1px 0;
        border-style: solid;
    }
}
</style>