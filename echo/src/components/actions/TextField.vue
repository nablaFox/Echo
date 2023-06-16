<script setup lang="ts">
defineProps<{
    placeholder: string
    height?: string
}>()
</script>


<template>

    <div 
        class="text-field"
        :style="{ height: height }"
    >
        <div class="placeholder">
            {{ placeholder }}
        </div>
        <div class="input">
            <slot>
                FallBack content (base input)
            </slot>
        </div>
    </div>

</template>


<style lang="scss" scoped>
.text-field {
    @include flex($direction: column, $align: auto);
    height: auto;
    width: 100%;
    padding: 10px 15px;
    border: 1px solid var(--md-sys-color-outline-variant);
    border-radius: $small-rounded;
    gap: 4px;
}

.placeholder {
    @extend %label-medium;
    font-size: 13px;
    color: var(--md-sys-color-outline)
}

.input { 
    min-height: 20px;
}
</style>