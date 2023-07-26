<template>
<UiModal class="modal" :is-open="props.isOpen">
	<div>
		<h1 class="heading">Edit task  {{ props.card.id }}</h1>
		<FormEditTask :card="props.card"/>
	</div>
</UiModal>
</template>

<script setup>
import UiModal from '@/components/ui/UiModal.vue';
import FormEditTask from '@/components/forms/FormEditTask.vue';

const props = defineProps({
	card: {
		type: Object,
		default: () => {},
	},

	isOpen: {
		type: Boolean,
		default: false,
	},
});
</script>

<style scoped lang="scss">
.modal {
	padding: 10px;
}

.heading {
	color: #fff;
}
</style>
