<script lang="ts" setup>
import { ref, computed } from 'vue'
import Icon from './Icon.vue'

export interface Props {
    as?: string
    icon: string
    variant?: 'filled' | 'outlined' | 'tonal'
    iconVariant?: string
    toggleable?: boolean
    href?: string
}

const props = withDefaults(defineProps<Props>(), { as: 'button' })
const emit = defineEmits(['change'])

const selected = ref(false)

const isRegularLink = computed(() => props.as === 'a')
const isRouterLink = computed(() => props.as === 'router-link')

function onClick() {
    if (props.toggleable) {
        selected.value = !selected.value
        emit('change', selected.value)
    }
}
</script>


<template>

    <component
        :is="as"
        class="icon-btn state-layer"
        :class="[
            { 'toggleable': toggleable, 'selected': selected },
            variant
        ]"
        :href="isRegularLink && href"
        :to="isRouterLink && href"
        @click="onClick"
        
    >
        <Icon
            size="26px"
            :icon="icon"
            :variant="iconVariant"
        />
    </component>

</template>


<style lang="scss" scoped>
.icon-btn {
    @include flex();

    border-radius: $full-rounded;
    overflow: hidden;
    color: var(--md-sys-color-on-surface-variant);
    padding: 8px;

    &.filled {
        color: var(--md-sys-color-on-primary);
        background-color: var(--md-sys-color-primary);
    }

    &.outlined {
        border: 1px solid var(--md-sys-color-outline)
    }

    &.tonal {
        color: var(--md-sys-color-on-secondary-container);
        background-color: var(--md-sys-color-secondary-container);
    }
}

.toggleable {
    &.filled {
        color: var(--md-sys-color-primary);
        background-color: var(--md-sys-color-surface-variant);
    }

    &.tonal {
        color: var(--md-sys-color-on-surface-variant);
        background-color: var(--md-sys-color-surface-variant);
    }
}

.selected {
    color: var(--md-sys-color-primary)!important;

    &.filled {
        color: var(--md-sys-color-on-primary)!important;
        background-color: var(--md-sys-color-primary);
    }

    &.outlined {
        border: none;
        color: var(--md-sys-color-inverse-on-surface)!important;
        background-color: var(--md-sys-color-inverse-surface);
    }

    &.tonal {
        color: var(--md-sys-color-on-secondary-container)!important;
        background-color: var(--md-sys-color-secondary-container);
    }
}
</style>