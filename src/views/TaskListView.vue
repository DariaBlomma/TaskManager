<template>
  <div class="task-list-view">
	  <h1 class="heading">Tasks</h1>
	  <TaskList
			  :list="taskList"
			  @edit-task="onEditTask"
			  @delete-task="onDeleteTask"
	  />
	  <UiButton
			  class="add-btn"
			  text="Add task"
			  @click="handleAddTaskClick"
	  />
	  <ModalEditTask
			  :is-open="isModalOpen"
			  :card="chosenTask"
			  @close="handleModalClose"
	  />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskList from '@/components/TaskList.vue';
import UiButton from '@/components/ui/UiButton.vue';
import ModalEditTask from '@/components/ModalEditTask.vue';

const taskList = [
	{
		id: 1,
		title: 'Name 1',
		description: 'Desc 1',
	},
	{
		id: 2,
		title: 'Name 2',
		description: 'Desc 2',
	},
	{
		id: 3,
		title: 'Name 3',
		description: 'Desc 3',
	},
];

const isModalOpen = ref(false);
const chosenTask = ref({});

const onEditTask = (id) => {
	isModalOpen.value = true;
	chosenTask.value = taskList.find(elem => elem.id === id);
};

const onDeleteTask = (id) => {
	console.log('on delete task', id);
	//open dialog confirm
};

const handleAddTaskClick = () => {
	console.log('in add task click')
};

const handleModalClose = () => {
	isModalOpen.value = false;
};
</script>

<style scoped lang="scss">
  .task-list-view {
	  display: grid;
	  grid-template-rows: 50px 1fr 40px;
	  gap: 15px;
		padding: 20px;
  }

  .heading, .add-btn {
	  justify-self: center;
  }

  .add-btn {
	  width: fit-content;
  }
</style>
