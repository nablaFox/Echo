<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

import ListItem from '../containment/ListItem.vue'
import IconButton from '../actions/IconButton.vue'

export interface Item {
    content: string
    icon?: string
    divider?: boolean,
    task: Function
}

defineProps<{ 
    items: Array<Item>
    width?: string
    gap?: number
    blocked?: boolean
    icon?: string
}>()

const active = ref(false)
const target = ref<HTMLElement | null>(null)

onClickOutside(target, 
    () => (active.value = false), 
    { ignore: ['.opener'] }
)
</script>


<template>

    <div class="menu__container">
        <IconButton
            class="opener"
            :icon="icon || 'more_vert'"
            @click="active = !active"
            :style="{ pointerEvents: blocked ? 'none' : 'all' }"
        />
        
        <Transition>
            <div 
                class="menu"
                ref="target"
                v-if="!blocked && active"
                :style="{ 
                    width: width,
                    top: `${100 + (gap || 0)}%`
                }"
            >
                <ListItem
                    v-for="item in items"
                    :headline="item.content"
                    :divider="item.divider"
                    @click="item.task(); active = false"
                />
            </div>    
        </Transition>
    </div>
    
</template>


<style lang="scss" scoped>
.menu__container { position: relative }

.menu {
    box-shadow: var(--md-sys-elevation2);
    border-radius: $small-rounded;
    position: absolute;
    width: 150px;
    right: 0;
    z-index: 9999;
    overflow: hidden;
}

.list-item { background-color: var(--md-sys-color-surface1) }

.v-enter-active,
.v-leave-active {
    transition: opacity .15s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
