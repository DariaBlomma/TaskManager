export type Values = {
  [key: Field['name']]: string,
}

export interface Meta {
  isValid: boolean,
  isTouched: boolean,
}

export interface Errors {
  [key: Field['name']]: string,
}

export interface FormCtx {
  meta: Meta,
  values: Values,
  errors: Errors,
  setFieldValue: (name: string, value: string) => void,
  setIsTouched: (isTouched: boolean) => void,
  setErrors: (field: Field) => void,
}

export type Field  = {
  name: string,
  error: string,
  setFieldValue: () => void,
  setIsTouched: (isTouched: boolean) => void,
}

export interface Validators {
  isRequired?: boolean,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  customValidator?: (value: string) => string, //returns error
}

export interface ValidationListeners {
  blur: ValidationCallback,
  change: ValidationCallback,
  input: ValidationCallback,
}

type ValidationCallback = (e: Event, shouldValidate?: boolean) => void;

export type FormElemType = 'text' | 'number';

export type StringLengthCondition = 'min' | 'max';
