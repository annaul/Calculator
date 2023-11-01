import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { getButtonWidth, styles } from './styles';
import { buttons, specialCharacters } from './data';
import { Button } from './types';

export default function App() {
	const [prevValue, setPrevValue] = useState<any>(0);
	const [currentValue, setCurrentValue] = useState<any>(0);
	const [operation, setOperation] = useState<any>('');
	const [displayValue, setDisplayValue] = useState<any>('0');

	const calculate = (value: string) => {
		if (value === 'AC') {
			setPrevValue(0);
			setCurrentValue(0);
			setOperation('');
			setDisplayValue('0');
		} else if (specialCharacters.includes(value)) {
			if (operation !== '') {
				if (operation === '/') {
					setDisplayValue(parseFloat(prevValue) / parseFloat(currentValue));
          setCurrentValue(parseFloat(prevValue) / parseFloat(currentValue))
				} else if (operation === 'x') {
					setDisplayValue(parseFloat(prevValue) * parseFloat(currentValue));
          setCurrentValue(parseFloat(prevValue) * parseFloat(currentValue))
				} else if (operation === '-') {
					setDisplayValue(parseFloat(prevValue) - parseFloat(currentValue));
          setCurrentValue(parseFloat(prevValue) - parseFloat(currentValue))
				} else if (operation === '+') {
					setDisplayValue(parseFloat(prevValue) + parseFloat(currentValue));
          setCurrentValue(parseFloat(prevValue) + parseFloat(currentValue))
				}
    
			} else {
				setOperation(value);
				setPrevValue(currentValue);
				setCurrentValue(0);
				setDisplayValue(currentValue);
			}
		} else if (!specialCharacters.includes(value) && value !== '='&& ) {
			if (currentValue === 0) {
				setCurrentValue(value);
				setDisplayValue(value);
			} else {
				setDisplayValue(currentValue + '' + value);
				setCurrentValue(currentValue + '' + value);
			}
		} else if (value === '=') {
			if (operation === '/') {
				setDisplayValue(parseFloat(prevValue) / parseFloat(currentValue));
			} else if (operation === 'x') {
				setDisplayValue(parseFloat(prevValue) * parseFloat(currentValue));
			} else if (operation === '-') {
				setDisplayValue(parseFloat(prevValue) - parseFloat(currentValue));
			} else if (operation === '+') {
				setDisplayValue(parseFloat(prevValue) + parseFloat(currentValue));
			}
			setCurrentValue(0);
			setPrevValue(0);
			setOperation('');
		}
	};

	const renderItem = (item: Button) => {
		const width = getButtonWidth(item.value);
		return (
			<TouchableOpacity
				onPress={() => calculate(item.value)}
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
