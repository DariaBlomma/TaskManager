<template>
  <div class="card">
	  <div
			  class="row"
	      v-for="row in rows"
			  :key="row.id"
	  >
		  <b class="label">{{ row.label}}: </b>
		  <span class="value">{{ row.value }}</span>
	  </div>
	  <div class="footer">
		  <IconTrashBin
				  :width='15'
				  :height="15"
				  @click="handleDeleteClick"
		  />
		  <IconEdit
				  :width='15'
				  :height="15"
				  @click="handleEditClick"
		  />
	  </div>
  </div>
</template>

<script setup>
import IconEdit from './icons/IconEdit.vue';
import IconTrashBin from '@/components/icons/IconTrashBin.vue';

const props = defineProps({
	card: {
		type: Object,
		default: () => {},
	},
});

const emit = defineEmits(['edit', 'delete']);

const rows = [
	{
		id: 1,
		label: 'Id',
		value: props.card.id,
	},
	{
		id: 2,
		label: 'Title',
		value: props.card.title,
	},
	{
		id: 3,
		label: 'Description',
		value: props.card.description,
	},
];

const handleDeleteClick = () => {
	emit('delete', props.card.id);
};

const handleEditClick = () => {
	emit('edit', props.card.id);
};
</script>

<style scoped lang="scss">
.card {
	display: flex;
	flex-direction: column;
	gap: 10px;
  padding: 20px;
	border-radius: 8px;
	border: 1px solid $grey-300;
}

.label {
	font-size: 16px;
	font-weight: 600;
}

.footer {
	display: flex;
	justify-content: space-around;
}
</style>
