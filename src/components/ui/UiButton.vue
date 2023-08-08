<template>
<button
		class="btn _default"
		:class="props.theme"
		:type="props.type"
		:disabled="isDisabled"
>
	<slot>{{ props.text }}</slot>
</button>
</template>

<script setup lang="ts">
type Theme = 'default';

interface Props {
	text?: string,
	type?: 'button' | 'submit',
	theme?: Theme,
	isDisabled?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'default',
});
</script>

<style scoped lang="scss">
.btn {
	padding: 10px 20px;
	border-radius: 8px;
	transition: background-color 0.5s ease;
	cursor: pointer;
	user-select: none;

	&._default {
		background-color: $green-500;

		&:hover {
			background-color: $green-600;
		}

		&:active {
			  background-color: $green-700;
				color: $grey-300;
	  }

		&:disabled {
			background-color: $green-200;
			color: $grey_700;
			pointer-events: none;
		}
	 }
}
</style>
