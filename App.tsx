import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ColorValue, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const buttonWidth = screenWidth / 5.5;
const margin = buttonWidth / 11;

interface Button {
	value: string;
	color: ColorValue;
	textColor: ColorValue;
}

const buttons: Button[] = [
	{ value: 'AC', color: '#a5a5a5', textColor: '#050505' },
	{ value: '+/-', color: '#a5a5a5', textColor: '#050505' },
	{ value: '%', color: '#a5a5a5', textColor: '#050505' },
	{ value: '/', color: '#ff9f06', textColor: '#ffffff' },
	{ value: '7', color: '#333333', textColor: '#f6f6f6' },
	{ value: '8', color: '#333333', textColor: '#f6f6f6' },
	{ value: '9', color: '#333333', textColor: '#f6f6f6' },
	{ value: 'x', color: '#ff9f06', textColor: '#ffffff' },
	{ value: '4', color: '#333333', textColor: '#f6f6f6' },
	{ value: '5', color: '#333333', textColor: '#f6f6f6' },
	{ value: '6', color: '#333333', textColor: '#f6f6f6' },
	{ value: '-', color: '#ff9f06', textColor: '#ffffff' },
	{ value: '1', color: '#333333', textColor: '#f6f6f6' },
	{ value: '2', color: '#333333', textColor: '#f6f6f6' },
	{ value: '3', color: '#333333', textColor: '#f6f6f6' },
	{ value: '+', color: '#ff9f06', textColor: '#ffffff' },
	{ value: '0', color: '#333333', textColor: '#f6f6f6' },
	{ value: '.', color: '#333333', textColor: '#f6f6f6' },
	{ value: '=', color: '#ff9f06', textColor: '#ffffff' }
];

const specialCharacters: string[] = ['/', 'x', '-', '+'];

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
			setOperation(value);
			setPrevValue(currentValue);
			setCurrentValue(0);
			setDisplayValue(currentValue);
		} else if (!specialCharacters.includes(value) && value !== '=') {
			if (currentValue === 0) {
				setCurrentValue(value);
				setDisplayValue(value);
			} else {
				setDisplayValue(currentValue + '' + value);
				setCurrentValue(currentValue + '' + value);
			}
		} else if (value === '=') {
			if (operation === '/') {
				setDisplayValue(parseInt(prevValue) / parseInt(currentValue));
			} else if (operation === 'x') {
				setDisplayValue(parseInt(prevValue) * parseInt(currentValue));
			} else if (operation === '-') {
				setDisplayValue(parseInt(prevValue) - parseInt(currentValue));
			} else if (operation === '+') {
				setDisplayValue(parseInt(prevValue) + parseInt(currentValue));
			}
			setCurrentValue(0);
			setPrevValue(0);
			setOperation('');
		}
	};

	const renderItem = (item: Button) => {
		const width = item.value === '0' ? (buttonWidth + margin) * 2 : buttonWidth;
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

const styles = StyleSheet.create({
	container: {
		top: buttonWidth,
		flex: 1,
		backgroundColor: '#000000'
	},
	buttonContainer: {
		height: buttonWidth,
		borderRadius: 100,
		margin: margin,
		alignItems: 'center',
		justifyContent: 'center'
	},
	flatlistContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 30,
		fontWeight: '600'
	},
	displayText: {
		fontSize: 60,
		fontWeight: '200',
		color: '#ffffff',
		textAlign: 'right',
		paddingHorizontal: margin * 5,
		width: screenWidth
	}
});
