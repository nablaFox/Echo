<script setup lang="ts">
import { ref, computed, provide, readonly } from 'vue'

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

const footerVisible = ref(true)
const headerVisible = ref(true)

const headerFixed = computed(() => props.headerFixed === true)
const footerFixed = computed(() => props.footerFixed === true)

const pagePadding = computed(() => {
    if (!container.value) return
    const style = getComputedStyle(container.value as Element)
    const paddingLeft = props.padding || style.paddingLeft
    const paddingRight = props.padding || style.paddingRight

    const paddingTop = headerFixed.value && headerVisible.value ? 
        header.value?.clientHeight + 'px' : '0'
    
    const paddingBottom = footerFixed.value && footerVisible.value ? 
        footer.value?.offsetHeight + 'px': '0'

    return `
        ${paddingTop} ${paddingRight}
        ${paddingBottom} ${paddingLeft}
    `
})

const showFooter = () => {
    container.value!.style.transition = 'padding .4s ease' 
    footerVisible.value = true
    setTimeout(() => (container.value!.style.transition = ''), 400)
}

const hideFooter = () => (footerVisible.value = false)

const showHeader = () => {
    container.value!.style.transition = 'padding .4s ease' 
    headerVisible.value = true
    setTimeout(() => (container.value!.style.transition = ''), 400)
}

const hideHeader = () => (headerVisible.value = false)

provide('footer', {
    isVisible: readonly(footerVisible),
    hideFooter,
    showFooter
})

provide('header', {
    isVisible: readonly(headerVisible),
    hideHeader,
    showHeader
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
        <Transition name="header">
            <header
                v-if="headerVisible"
                ref="header"
                :class="['header', headerFixed && 'fixed']"
                :style="{ 
                    padding: headerPadding, 
                    height: headerHeight,
                }"
            >
                <slot name="header" />
            </header>
        </Transition>

        <slot />

        <Transition name="footer">
            <footer
                v-if="footerVisible"
                ref="footer"
                :class="['footer', footerFixed && 'fixed']"
                :style="{
                    padding: footerPadding,
                    height: footerHeight,
                }"
            >
                <slot name="footer" />
            </footer>
        </Transition>
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
    will-change: padding;
}

.header {
    width: 100%;

    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9900;
    }
}

.footer {
    width: 100%;

    &.fixed {
        position: fixed;
        bottom: 0;
        z-index: 9900;
        left: 0;
    }
}

.footer-enter-active,
.footer-leave-active,
.header-enter-active,
.header-leave-active {
    transition: transform .4s ease;
}

.footer-enter-from,
.footer-leave-to {
    transform: translateY(100%)
}

.header-enter-from,
.header-leave-from {
    transform: translateY(-100%)
}
</style>