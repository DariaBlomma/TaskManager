<template>
	<form @submit.prevent="handleSubmit">
		<UiFormElem
				name="title"
				label="Title"
				:value="props.card.title"
				:validators="{
						isRequired: true,
						minLength: 2,
				}"
		/>

		<UiFormElem
				name="description"
				:value="props.card.description"
				label="Description"
		/>

		<UiFormElem
				name="test"
				label="Test"
				type="number"
				value="1"
				:validators="{
						min: 1,
						max: 10,
				}"
		/>

		<UiButton
				class="submit"
				text="Save"
				type="submit"
				:is-disabled="isSubmitDisabled"
		/>
	</form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useForm } from '@/components/composables/useForm';
import type { Task } from '@/types';
import UiFormElem from '@/components/ui/UiFormElem.vue';
import UiButton from '@/components/ui/UiButton.vue';

interface Props {
	card: Task,
}
const props = defineProps<Props>();

const { formCtx } = useForm();

const isSubmitDisabled = computed(() => !formCtx.meta.isValid || !formCtx.meta.isTouched);

const handleSubmit = () => {
	console.log("-> formData", formCtx.values);
};
</script>

<style scoped lang="scss">
.submit {
	display: block;
	margin: 0 auto;
}
</style>
