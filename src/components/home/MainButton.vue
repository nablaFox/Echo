<template>

    <button class="main-button material-icons-outlined">
        graphic_eq
    </button>

</template>

<style scoped lang="scss">
.main-button {
    background-color: var(--md-sys-color-inverse-primary);
    color: var(--md-sys-color-on-surface);
    border-radius: 100%;
    width: 200px;
    height: 200px;
    font-size: 70px;

    @include maxHSize(719px) {
        height: 160px;
        width: 160px;
        font-size: 66px;
    }
}
</style>