<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, computed } from 'vue'
import ListItem from '../containment/ListItem.vue'

export interface Item {
    content: string
    icon?: string
    divider?: boolean,
    task: Function
}

const props = defineProps<{ 
    items: Array<Item>,
    width?: string,
    gap?: number,
    blocked?: boolean
}>()

const active = ref(false)
const target = ref<HTMLElement | null>(null)

const isActive = computed(() => props.blocked ? false: active.value)
onClickOutside(target, 
    () => (active.value = false), 
    { ignore: ['.opener'] }
)
</script>


<template>

    <div class="menu__container">
        <button 
            class="opener" 
            @click="active = !active"
        >
            <slot />
        </button>
        
        <Transition>
            <div 
                class="menu"
                ref="target"
                v-if="isActive"
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
