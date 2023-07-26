<template>
	<div class="ui-input">
		<input
				class="native-input"
				aria-labelledby="#input"
				:type="props.type"
				:name="props.name"
				:value="props.value"
				v-on="validationListeners"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	type: {
		type: String,
		default: 'text',
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		default: '',
	},
	validationListeners: {
		type: Object,
		default: () => {},
	},
});
</script>

<style scoped lang="scss">
.ui-input {
	position: relative;
}

.native-input {
	padding: 10px 15px;
	border-radius: 8px;
	border: 1px solid #fff;
	width: 100%;
	color: $blue_900;
	transition: $input-transition;

	&:hover {
		border-color: white;
		box-shadow: $input-hover-shadow;
	}

	&:focus {
		outline: 0;
		border-color: $blue_300;
		box-shadow: $input-focus-shadow;
	}
}
</style>
