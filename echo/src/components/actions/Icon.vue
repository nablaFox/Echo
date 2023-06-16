<script setup lang="ts">
defineProps<{
    icon: string
    variant?: string
    size?: string
    color?: string
}>()
</script>

<template>

    <span 
        :class="
            variant ? 
            `material-icons-${variant}` 
            : 'material-icons'
        "
        :style="{ 
            fontSize: size,
            color: color
        }"
    >
        {{ icon }}
    </span>

</template>