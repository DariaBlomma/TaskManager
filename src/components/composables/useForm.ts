import { reactive, provide } from 'vue';
import type { Field, FormCtx, Values, Meta, Errors } from '@/types';


export const useForm = (): { formCtx: FormCtx } => {
	const values = reactive<Values>({});
	const meta = reactive<Meta>({
		isValid: false,
		isTouched: false,
	});
	const errors = reactive<Errors>({});
	
	const setIsValid = () => {
		const messages: string[] = Object.values(errors);
		const noError: boolean = messages.every(elem => !elem);
		meta.isValid = noError;
	};
	
	const setFieldValue = (name: string, value: string) => {
		values[name] = value;
	};
	
	const setIsTouched = (isTouched: boolean) => {
		meta.isTouched = isTouched;
	};
	
	const setErrors = (field: Field) => {
		errors[field.name] = field.error;
		setIsValid();
	};
	
	const formCtx: FormCtx = {
		meta,
		values,
		errors,
		setFieldValue,
		setIsTouched,
		setErrors,
	};
	
	provide('form', formCtx);
	
	return { formCtx };
};
