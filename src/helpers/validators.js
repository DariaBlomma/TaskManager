export const checkIsRequired = (val) => {
	return val ? '' : 'This field is required';
};

export const checkStringLength = (val, length, condition) => {
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

export const checkMinNumber = (val, min) => {
	return val < min ? `Min ${min}` : '';
};

export const checkMaxNumber = (val, max) => {
	return val > max ? `Max ${max}` : '';
};
