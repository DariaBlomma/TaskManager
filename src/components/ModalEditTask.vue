<template>
<UiModal class="modal" :is-open="props.isOpen">
	<div>
		<h1 class="heading">Edit task  {{ props.card.id }}</h1>
		<FormEditTask :card="props.card"/>
	</div>
</UiModal>
</template>

<script setup lang="ts">
import type { Task } from '@/types';
import UiModal from '@/components/ui/UiModal.vue';
import FormEditTask from '@/components/forms/FormEditTask.vue';

interface Props {
	card: Task,
	isOpen?: boolean,
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.modal {
	padding: 10px;
}

.heading {
	color: #fff;
}
</style>
