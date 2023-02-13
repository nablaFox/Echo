<template>

	<div class="action-bar">
		<div class="product"> Echo </div>
		<div class="profile"> 
			<span class="material-icons"> account_circle </span>
		</div>
	</div>
	
</template>


<style lang="scss">
.action-bar {
	width: 100%;
	background-color: var(--md-sys-color-surface1);
	@include flex($justify: space-between);
	border-radius: 8px;
	padding: 0 10px;
	height: 56px;
	user-select: none;
	@include maxHSize(719px) { height: 52px };
	line-height: 0;
}

.product {
	@extend %title-large;
}
</style>