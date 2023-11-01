import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { getButtonWidth, styles } from './styles';
import { buttons, specialCharacters } from './data';
import { Button } from './types';
import { append, calculate } from './calculationHelper';

export default function App() {
	const [prevValue, setPrevValue] = useState<any>(0);
	const [currentValue, setCurrentValue] = useState<any>(0);
	const [operation, setOperation] = useState<any>('');
	const [displayValue, setDisplayValue] = useState<any>('0');

	const updateValue = (value: string) => {
		if (value === 'AC') {
			setPrevValue(0);
			setCurrentValue(0);
			setOperation('');
			setDisplayValue('0');
		} else if (specialCharacters.includes(value)) {
			const display = calculate(operation, prevValue, currentValue);
			if (operation !== '') {
				setPrevValue(display);
				setDisplayValue(display);
			} else {
				setPrevValue(currentValue);
				setDisplayValue(currentValue);
			}
			setOperation(value);
			setCurrentValue(0);
		} else if (!specialCharacters.includes(value) && value !== '=') {
			if (currentValue === 0) {
				setCurrentValue(value);
				setDisplayValue(value);
			} else {
        const result = append(currentValue, value)
				setDisplayValue(result);
				setCurrentValue(result);
			}
		} else if (value === '=') {
			const display = calculate(operation, prevValue, currentValue);
			setDisplayValue(display);
			setCurrentValue(0);
			setPrevValue(0);
			setOperation('');
		}
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
