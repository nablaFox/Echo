<script lang="ts" setup>
import ToolTip from '@/components/containment/ToolTip.vue'

const props = defineProps<{
    hours: number
    peoples: number,
    rooms: number
}>()

const parseHours = (n: number) => parseFloat((n / 3600000).toFixed(1))

function format(n: number, name: string) {
    const formatted = name === 'hours' ? parseHours(n) : n
    if (formatted >= 1000) {
        return (formatted / 1000).toFixed(1).toString() + 'k'
    } else return formatted
}
</script>


<template>

    <div class="user-info">
        <ToolTip 
            class="group"
            v-for="data, name in props"
            :tip="name === 'hours' ? parseHours(data) : data"
        >
            <div class="data"> {{ format(data, name) }} </div>
            <div class="info"> {{ name }}</div>
        </ToolTip>
    </div>

</template>


<style lang="scss" scoped>
.user-info {
    border-radius: $large-rounded;
    border: 1px solid var(--md-sys-color-outline-variant);
    @include flex($justify: space-between);
    padding: 0 20px;
    height: 77px;
    user-select: none;

    @include maxHSize(719px) { height: 61.6px; }
}

.group { @include flex($direction: column) }

.info { @extend %label-large }

.data { @extend %title-large }
</style>