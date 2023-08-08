import type { StringLengthCondition } from '@/types';

export const checkIsRequired = (val: string): string => {
	return val ? '' : 'This field is required';
};

export const checkStringLength = (val: string, length: number, condition: StringLengthCondition): string => {
	switch (condition) {
		case 'max' : {
			return val.length > length ? `Max ${length} symbols` : '';
		}
		
		case 'min' : {
			return val.length < length ? `Min ${length} symbols` : '';
		}
		
		default : throw new Error('Error in checkStringLength - did you forget to add this case?')
	}
};

export const checkMinNumber = (val: number, min: number): string => {
	return val < min ? `Min ${min}` : '';
};

export const checkMaxNumber = (val: number, max: number): string => {
	return val > max ? `Max ${max}` : '';
};
