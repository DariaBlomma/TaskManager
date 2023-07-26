<template>
<div class="elem">
	<label for="input" class="label">
		{{ label }}
	</label>

	<UiInput
			:name="name"
			:type="type"
			:value="value"
			:validation-listeners="validationListeners"
	/>
	<span class="error-message">{{ errorMessage }}</span>
	<span v-if="validators.isRequired" class="required-mark">*</span>
	<slot></slot>
</div>
</template>

<script setup>
import {
	computed,
	onMounted,
	reactive,
	inject,
	ref,
} from 'vue';
import UiInput from '@/components/ui/UiInput.vue';
import { checkIsRequired, checkStringLength, checkMinNumber, checkMaxNumber } from '@/helpers';
/*
validators = {
	isRequired: false,
	min: 0,
	max: 0,
	minLength: 0,
	maxLength: 0,
	customValidator: (value) => error;
}
 */

const props = defineProps({
	label: {
		type: String,
		default: '',
	},
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
	validators: {
		type: Object,
		default: {
			isRequired: false,
		},
	},
});

const {
	label, type, name, validators,
} = reactive(props);

const form = inject('form');

const errorMessage = ref('');
const value = ref(props.value);

const textFieldValidators = [
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

const numberValidators = [
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
	form.setFieldValue(name, value.value);
	form.setErrors({
		name,
		error: errorMessage.value,
	});
});

const handleChange = (e, shouldValidate = true) => {
	if (!shouldValidate) return;
	const inputClass = '.native-input';
	const val = e.target.closest(inputClass).value.trim();
	value.value = val;
	validate(val);
	form.setFieldValue(name, value.value);
	form.setIsTouched(true);
	form.setErrors({
		name,
		error: errorMessage.value,
	});
};

const validate = (val) => {
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
			input: (e) => handleChange(e, false),
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
