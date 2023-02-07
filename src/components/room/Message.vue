<script lang="ts" setup>
import { computed } from 'vue'
import { useFormat } from '@/composables/format'
import dayjs from 'dayjs'

const props = defineProps<{
    origin: string,
    text: string,
    date: Date,
    prevDate: Date | null
}>()

const format = useFormat()

const isDivider = computed(() => {
    const date = dayjs(props.date)
    if (!props.prevDate) { return true }
    return Math.round(date.diff(props.prevDate, 'day', true)) > 0
})
</script>


<template>

    <div 
        class="message__container"
        :class="origin"
    >
        <div class="message">
            <div class="message__content">
                {{ text }}
                
                <div class="message__date">
                    {{ format.timestamp(date) }}
                </div>
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
.divider {
    width: 50%;
    height: fit-content;
    margin: 15px 0;
    @include flex($justify: center);
    background-color: var(--md-sys-color-surface1);
    opacity: .8;
    border-radius: $medium-rounded;
    align-self: center;
    user-select: none;
}

.divider__content {
    @extend %label-large;
    padding: 1px 0;
}

.message {
    @include flex();
    display: inline-flex;
    gap: 10px;
}

.message__content {
    border-radius: 16px 16px 16px 4px;
    padding: 6px 50px 9px 9px;
    position: relative;
    max-width: 260px;
    @extend %body-medium;
    font-size: 15.4px;
}


.message__date {
    position: absolute;
    @extend %label-small;
    right: 10px;
    bottom: 4px;
}

.sender {
    align-self: flex-end;
    .message__content { 
        border-radius: 16px 16px 4px 16px;
        background-color: var(--md-sys-color-tertiary-container);
        color: var(--md-sys-color-on-tertiary-container);
    }

    .message__date { 
        color: var(--md-sys-color-on-tertiary-container) 
    }

    .message { flex-direction: row-reverse }
}

.recipient {
    .message__content { 
        background-color: var(--md-sys-color-surface5);
    }
    .message__date { 
        color: var(--md-sys-color-on-surface-variant);
    }
}
</style>