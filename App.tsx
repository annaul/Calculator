import { StatusBar } from 'expo-status-bar';
import { SetStateAction, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { getButtonWidth, styles } from './styles';
import { buttons } from './data';
import { Button } from './types';
import { append, calculate, isDigitOrDecimal, isSpecialCharacter } from './calculationHelper';

export default function App() {
	const [prevValue, setPrevValue] = useState<string>('0');
	const [currentValue, setCurrentValue] = useState<string>('0');
	const [operation, setOperation] = useState<string>('');
	const [displayValue, setDisplayValue] = useState<string>('0');

	const updateValue = (value: string) => {
  // Check for the AC (All Clear) case
  if (value === 'AC') {
    resetCalculator();
  }
  // Check for special characters (+, -, *, /)
  else if (isSpecialCharacter(value)) {
    handleSpecialCharacter(value);
  }
  // Check for digits and decimal point
  else if (isDigitOrDecimal(value)) {
    handleDigitOrNewEntry(value);
  }
  // Check for the equals sign (=)
  else if (value === '=') {
    calculateResult();
  }
};

const resetCalculator = () => {
  setPrevValue('0');
  setCurrentValue('0');
  setOperation('');
  setDisplayValue('0');
};

const handleSpecialCharacter = (value: SetStateAction<string>) => {
  const display = calculate(operation, prevValue, currentValue) || '0';
  if (operation !== '') {
    setPrevValue(display);
    setDisplayValue(display);
  } else {
    setPrevValue(currentValue);
    setDisplayValue(currentValue);
  }
  setOperation(value);
  setCurrentValue('0');
};

const handleDigitOrNewEntry = (value: string) => {
  if (currentValue === '0') {
    setCurrentValue(value);
    setDisplayValue(value);
  } else {
    const result = append(currentValue, value);
    setDisplayValue(result);
    setCurrentValue(result);
  }
};

const calculateResult = () => {
  const display = calculate(operation, prevValue, currentValue) || '0';
  setDisplayValue(display);
  setCurrentValue('0');
  setPrevValue('0');
  setOperation('');
};

	const renderItem = (item: Button) => {
		const width = getButtonWidth(item.value);
		return (
			<TouchableOpacity
				onPress={() => updateValue(item.value)}
				style={[styles.buttonContainer, { width, backgroundColor: item.color }]}
			>
				<Text style={[styles.buttonText, { color: item.textColor }]}>
					{item.value}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#000000" />
			<FlatList
				data={buttons}
				numColumns={4}
				renderItem={({ item }) => renderItem(item)}
				contentContainerStyle={styles.flatlistContainer}
				ListHeaderComponent={
					<Text
						numberOfLines={1}
						ellipsizeMode="clip"
						style={styles.displayText}
					>
						{displayValue}
					</Text>
				}
			/>
		</View>
	);
}
