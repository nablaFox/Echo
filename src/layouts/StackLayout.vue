<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    padding?: string
    justify?: string
    align?: string
    mainPadding?: string
    headerHeight?: string
    headerPadding?: string
    headerFixed?: boolean
    footerHeight?: string
    footerPadding?: string
    footerFixed?: boolean
}>()

const container = ref<HTMLElement | null>(null)
const header = ref<HTMLElement | null>(null)
const footer = ref<HTMLElement | null>(null)

const headerFixed = computed(() => props.headerFixed === true)
const footerFixed = computed(() => props.footerFixed === true)

const pagePadding = computed(() => {
    if (!container.value) return
    const style = getComputedStyle(container.value as Element)
    const paddingLeft = props.padding || style.paddingLeft
    const paddingRight = props.padding || style.paddingRight

    const paddingTop = headerFixed.value ? 
        header.value?.clientHeight + 'px' : '0px'
    
    const paddingBottom = footerFixed.value ? 
        footer.value?.offsetHeight + 'px': '0px'


    return `
        ${paddingTop} ${paddingRight}
        ${paddingBottom} ${paddingLeft}
    `
})
</script>


<template>

    <div 
        ref="container"
        class="layout"
        :style="{ 
            padding: pagePadding,
            justifyContent: justify,
            alignItems: align
        }"
    >
        <header
            ref="header"
            :class="['header', headerFixed && 'fixed']"
            :style="{ 
                padding: headerPadding, 
                height: headerHeight,
            }"
        >
            <slot name="header" />
        </header>

        <slot />

        <footer
            ref="footer"
            :class="['footer', footerFixed && 'fixed']"
            :style="{
                padding: footerPadding,
                height: footerHeight,
            }"
        >
            <slot name="footer" />
        </footer>
    </div>

</template>


<style lang="scss" scoped>
.layout {
    width: 100%;
    height: var(--full-vh);
    padding: $page-padding;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.header {
    width: 100%;

    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    }
}

.footer {
    width: 100%;

    &.fixed {
        position: fixed;
        bottom: 0;
        z-index: 9999;
        left: 0;
    }
}
</style>