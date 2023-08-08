<template>
	<div class="task-list">
		<TaskCard
				v-for="item in props.list"
				:key="item.id"
				:card="item"
				@edit="onEdit"
				@delete="onDelete"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Task } from '@/types';
import TaskCard from '@/components/TaskCard.vue';

interface Props {
	list?: Task[] | [],
}
interface Emits {
	(e: 'edit-task', id: number): void,
	(e: 'delete-task', id: number): void,
}
const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const onEdit = (id: number) => {
	emit('edit-task', id);
};

const onDelete = (id: number) => {
	emit('delete-task', id);
};
</script>

<style scoped lang="scss">
.task-list {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}
</style>
