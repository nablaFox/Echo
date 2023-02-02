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
	min-height: 56px;
	margin-top: 10px;
	user-select: none;
}

.product {
	@extend %title-large;
}
</style>