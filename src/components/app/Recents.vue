<template>

    <div class="recents"> 
        <div 
            class="recent"
            v-for="n in 3"
        >
            <span class="name"> Room </span>
            <span class="time"> #34h </span>
        </div>
    </div>

</template>

<style lang="scss">


.recents {
	border-top: 1px solid var(--md-sys-color-outline-variant);
	border-bottom: 1px solid var(--md-sys-color-outline-variant);
	padding: 15px 20px;
	@include flex($justify: start);
	width: 100%;
	gap: 20px;
	@include maxHSize(719px) { padding: 10px }
}

.recent {
    @include flex();
    gap: 4px;
    background-color: var(--md-sys-color-surface1);
    border-radius: $small-rounded;
    @extend %label-medium;
    height: 40px;
    padding: 0 10px;

    @include maxHSize(719px) { height: 32px }
}

.time { color: var(--md-sys-color-primary) }


</style>