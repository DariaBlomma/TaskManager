<template>
	<div
			class="modal"
			v-if="props.isOpen"
	>
		<div class="content">
			<IconCross
					class="cross"
					@click="handleCrossClick"
			/>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import IconCross from '@/components/icons/IconCross.vue';

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['close']);
const handleCrossClick = () => {
	emit('close');
};

</script>
<style scoped lang="scss">
.modal {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(black, 0.5);
}

.content {
	position: relative;
	padding: 20px;
	border-radius: 8px;
	background-color: $grey-400;
}

.cross {
	position: absolute;
	top: 14px;
	right: 14px;
	z-index: 1;
	transition: opacity 0.5s ease;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}

	&:active {
		opacity: 0.8;
	}
}
</style>
