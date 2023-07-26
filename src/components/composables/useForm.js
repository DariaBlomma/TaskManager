import { reactive, provide } from 'vue';

export const useForm = () => {
	const values = reactive({});
	const meta = reactive({
		isValid: false,
		isTouched: false,
	});
	const errors = reactive({});
	// name: string (errorMessage)
	
	const setIsValid = () => {
		const messages = Object.values(errors);
		const noError = messages.every(elem => !elem);
		meta.isValid = noError;
	};
	
	const setFieldValue = (name, value) => {
		values[name] = value;
	};
	
	const setIsTouched = (isTouched) => {
		meta.isTouched = isTouched;
	};
	
	const setErrors = (field) => {
		errors[field.name] = field.error;
		setIsValid();
	};
	
	const formCtx = {
		meta,
		values,
		setFieldValue,
		setIsTouched,
		setErrors,
		errors,
	};
	
	provide('form', formCtx);
	
	return { formCtx };
};
