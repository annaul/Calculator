export const calculate = (char: string, prevValue: string, currentValue: string) => {
	if (char === '/') {
		return parseFloat(prevValue) / parseFloat(currentValue);
	} else if (char === 'x') {
		return parseFloat(prevValue) * parseFloat(currentValue);
	} else if (char === '-') {
		return parseFloat(prevValue) - parseFloat(currentValue);
	} else if (char === '+') {
		return parseFloat(prevValue) + parseFloat(currentValue);
	}
};

export const append = (a: number, b: string) => {
	return a + '' + b
}