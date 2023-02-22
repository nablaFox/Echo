<script lang="ts" setup>
defineProps<{
    href?: string,
    icon?: string,
    label?: string,
    circular?: boolean
}>()

defineEmits(['select'])
</script>


<template>

    <div class="segment">
        <RouterLink
            :to="href || '/'"
            :class="{ circular: circular }"
            class="segment__btn"
            @click="$emit('select')"
        >
            <span class="material-icons">
                {{ icon }}
            </span>
        </RouterLink>

        <div 
            class="segment__label" 
            v-if="label && !circular"
        >
            {{ label }}
        </div>
    </div>

</template>


<style lang="scss" scoped>
.segment {
    @include flex($direction: column);
    gap: 4px;
}

.segment__btn {
    overflow: hidden;
    border-radius: $large-rounded;
    padding: 4px 20px;
    @include flex();

    &.circular {
        border-radius: $full-rounded;
        padding: 16px;
    }
}

.segment__label { @extend %label-medium }

.active {
    .segment__btn {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
    }

    .segment__label { font-weight: 700 }
}
</style>