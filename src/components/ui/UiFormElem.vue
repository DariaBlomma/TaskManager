<template>
<div class="elem">
	<label for="input" class="label">
		{{ label }}
	</label>

	<UiInput
			:name="name"
			:type="type"
			:value="fieldValue"
			:validation-listeners="validationListeners"
	/>
	<span class="error-message">{{ errorMessage }}</span>
	<span v-if="validators.isRequired" class="required-mark">*</span>
	<slot></slot>
</div>
</template>

<script setup lang="ts">
import {
	computed,
	onMounted,
	reactive,
	inject,
	ref,
} from 'vue';
import UiInput from '@/components/ui/UiInput.vue';
import { checkIsRequired, checkStringLength, checkMinNumber, checkMaxNumber } from '@/helpers';
import type { Field, FormElemType, Validators, StringLengthCondition, FormCtx } from '@/types';

// todo: подумать над объединением TextFieldValidator, NumberFieldValidator, парамтерами fn
interface TextFieldValidator {
	validator?: number, //any value from Validators
	fn: (val: string, length: number, condition: StringLengthCondition) => string, //returns error message
	lengthCondition: StringLengthCondition,
}

interface NumberFieldValidator {
	validator?: number, //any value from Validators
	fn: (val: number, restriction: number) => string, //returns error message
}


interface Props {
	label?: string,
	type?: FormElemType,
	name: string,
	value?: string,
	validators?: Validators,
}

const props = withDefaults(defineProps<Props>(), {
	type: 'text',
	validators: () => ({
		isRequired: false,
	}),
});

const {
	label, type, name, value,  validators,
} = reactive(props);

const form = inject('form') as FormCtx;

const errorMessage = ref('');

const fieldValue = ref(value || '');

const textFieldValidators: TextFieldValidator[] = [
	{
		validator: validators.maxLength,
		fn: checkStringLength,
		lengthCondition: 'max',
	},
	{
		validator: validators.minLength,
		fn: checkStringLength,
		lengthCondition: 'min',
	},
];

const numberValidators: NumberFieldValidator[] = [
	{
		validator: validators.min,
		fn: checkMinNumber,
	},
	{
		validator: validators.max,
		fn: checkMaxNumber,
	},
];

onMounted(() => {
	form.setFieldValue(name, fieldValue.value);
	form.setErrors({
		name,
		error: errorMessage.value,
	} as Field);
});

const handleChange = (e: Event, shouldValidate = true) => {
	if (!shouldValidate) return;
	const inputClass = '.native-input';
	const target = e.target as HTMLElement;
	const val = (target?.closest(inputClass) as HTMLFormElement).value.trim() || '';
	fieldValue.value = val;
	validate(val);
	form.setFieldValue(name, fieldValue.value);
	form.setIsTouched(true);
	form.setErrors({
		name,
		error: errorMessage.value,
	} as Field);
};

const validate = (val: string) => {
	if (validators.isRequired) {
		const error = checkIsRequired(val);
		errorMessage.value = error;
		if (error) {
			return;
		}
	}

	if (type === 'text') {
		textFieldValidators.some(item => {
			if (item.validator) {
				const error = item.fn(val, item.validator, item.lengthCondition);
				errorMessage.value = error;
				if (error) {
					return true;
				}
			}
		})
	}

	if (type === 'number') {
		if (val) {
			numberValidators.some(item => {
				if (item.validator) {
					const error = item.fn(Number(val), item.validator);
					errorMessage.value = error;
					if (error) {
						return true;
					}
				}
			});
		} else {
			errorMessage.value = '';
		}
	}
};

const validationListeners = computed(() => {
	if (!errorMessage.value) {
		return {
			blur: handleChange,
			change: handleChange,
			input: (e: Event) => handleChange(e, false),
		};
	}
	return {
		blur: handleChange,
		change: handleChange,
		input: handleChange,
	};
});
</script>

<style scoped lang="scss">
.elem {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 15px;
	border-radius: 16px;
}

.label {
	font-size: 15px;
	padding-bottom: 5px;
}

.required-mark {
	position: absolute;
	top: 15px;
	left: 0;
	color: $red_200;
}

.error-message {
	height: 20px;
	padding-top: 7px;
	color: $red_200;
}
</style>
