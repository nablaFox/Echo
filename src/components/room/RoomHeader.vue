<script setup lang="ts">

defineProps<{
    roomName: string
}>()

</script>

<template>

    <header class="room-header">
        <div class="content">
            <div class="name"> {{ roomName }}</div>
            <div class="trailing">
                <span class="material-icons">search</span>
                <span class="material-icons">more_vert</span>
            </div>
        </div>
        <!-- <div class="curtain"></div> -->
    </header>

</template>


<style lang="scss" scoped>

.room-header {
    @include flex($direction: column);
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 8px;
}

.content {
    @include flex($justify: space-between);
    width: 100%;
    height: 60px;
    line-height: 0;
}

.name {
    @extend %title-large;
}

.trailing {
    @include flex();
    gap: 30px;
}

.curtain {
    width: 100%;
}

.curtain::before {
    
    display: block;
    width: 100%;
    height: 32px;
    background: transparent;//linear-gradient(var(--md-sys-color-background),transparent 70%);
    content: "";

}


</style>