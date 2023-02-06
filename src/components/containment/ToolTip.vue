<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps(['tip'])

const target = ref<HTMLInputElement | null>(null)
const active = ref(false)

onClickOutside(target, () => (active.value = false))
</script>

<template>
    
    <div 
        class="tool-tip"
        @click="active = !active"
        ref="target"
    >
        <Transition>
            <div class="tip"
                v-if="active"
            >
                {{ tip }}
            </div>
        </Transition>
        <slot />
    </div>

</template>


<style lang="scss" scoped>
.tip {
    @include flex();
    display: inline-flex;
    height: 26px;
    padding: 0 20px;
    background-color: var(--md-sys-color-surface5);
    border-radius: $extra-small-rounded;
    position: absolute;
    z-index: 1;
    @extend %label-medium;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;

    &::after {
        content: "";
        width: 15px;
        height: 15px;
        background-color: inherit;
        position: absolute;
        top: -20%;
        transform: rotate(45deg);
        border-radius: 3px;
        z-index: -1;
    }
}

.tool-tip { position: relative; }

.v-enter-active,
.v-leave-active {
    transition: opacity .08s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>