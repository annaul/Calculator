import { StatusBar } from 'expo-status-bar';
import { ColorValue, Dimensions, ViewStyle } from 'react-native';
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

export default function App() {
	const renderItem = (item: Button) => {
		const width = item.value === '0' ? (buttonWidth + margin) * 2 : buttonWidth;
		return (
			<View
				style={[styles.buttonContainer, { width, backgroundColor: item.color }]}
			>
				<Text style={[styles.buttonText, { color: item.textColor }]}>
					{item.value}
				</Text>
			</View>
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
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		top: buttonWidth,
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center',
		justifyContent: 'center'
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
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 30,
		fontWeight: '600'
	}
});
