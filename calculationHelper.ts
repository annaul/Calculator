export const calculate = (char: string, prevValue: string, currentValue: string) => {
	if (char === '/') {
		return (parseFloat(prevValue) / parseFloat(currentValue)).toString();
	} else if (char === 'x') {
		return (parseFloat(prevValue) * parseFloat(currentValue)).toString();
	} else if (char === '-') {
		return (parseFloat(prevValue) - parseFloat(currentValue)).toString();
	} else if (char === '+') {
		return (parseFloat(prevValue) + parseFloat(currentValue)).toString();
	}
};

export const append = (a: string, b: string) => {
	return a + '' + b
}