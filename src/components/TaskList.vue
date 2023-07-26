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

<script setup>
import TaskCard from '@/components/TaskCard.vue';

const props = defineProps({
	list: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['edit-task', 'delete-task']);

const onEdit = (id) => {
	emit('edit-task', id);
};

const onDelete = (id) => {
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
