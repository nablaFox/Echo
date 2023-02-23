<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScroll } from '@vueuse/core'

const props = defineProps<{ 
    keepLastScroll?: boolean
    behavior?: 'smooth' | 'auto'
    topOffset?: number
    bottomOffset?: number
}>()

const emit = defineEmits<{
    (e: 'scrollTop', y: number): void
    (e: 'scrollBottom', y: number): void
    (e: 'arrivedTop'): void
    (e: 'arrivedBottom'): void
}>()

const scroller = ref<HTMLElement | null>(null)
const { y } = useScroll(scroller, { behavior: props.behavior || 'smooth' })

let scroll = 0
function onScroll(e: Event) {
    const target = (e.target as HTMLElement)

    if (target.scrollTop < scroll) { // scroll top
        const offset = props.topOffset || 0
        
        if (
            target.scrollTop >= 0
            && target.scrollTop <= offset
        ) { emit('arrivedTop') }

        if (
            target.scrollTop
            - target.offsetHeight
            + target.scrollHeight <= offset
        ) { emit('arrivedTop') } // reverse

        emit('scrollTop', target.scrollTop)
    }

    else if (target.scrollTop > scroll) { // scroll down
        const offset = props.bottomOffset || 0

        if (
            target.scrollHeight
            - target.offsetHeight
            - target.scrollTop <= offset
        ) { emit('arrivedBottom') }

        if (
            target.scrollTop <= 0
            && -target.scrollTop <= offset
        ) { emit('arrivedBottom') } // reverse

        emit('scrollBottom', target.scrollTop)
    }

    scroll = target.scrollTop
}

const to = (pos: number) => (y.value = pos)
const toTop = () => (y.value = 0)
const toBottom = () => {
    setTimeout(() => {  
        y.value = scroller.value!.scrollHeight - scroller.value!.offsetHeight
    }, 0) // implement negative scroll
}

onMounted(
    () => (y.value = parseInt(localStorage.getItem('ex_rooms_scroll-quote')!))
)
onUnmounted(() => {
    if (props.keepLastScroll) {
        localStorage.setItem('ex_rooms_scroll-quote', y.value.toString())
    }
})

defineExpose({ y, to, toTop, toBottom })
</script>

<template>

    <div 
        ref="scroller"
        class="scroller"
        @scroll="onScroll"
    >
        {{ behavior }}
        <slot />
    </div>
  
</template>


<style lang="scss" scoped>
.scroller {
    overflow-y: scroll;
    @include hide-scrollbar();
}
</style>