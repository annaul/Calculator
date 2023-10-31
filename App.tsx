import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const buttonWidth = screenWidth / 5;
const margin = buttonWidth / 10;

const buttons = [
	'AC',
	'+/-',
	'%',
	'/',
	'7',
	'8',
	'9',
	'x',
	'4',
	'5',
	'6',
	'-',
	'1',
	'2',
	'3',
	'+',
	'0',
	'.',
	'='
];

export default function App() {
	const renderItem = (item: String) => {
		return (
			<View
				style={[
					styles.buttonContainer,
					{ width: item === '0' ? (buttonWidth + margin) * 2 : buttonWidth }
				]}
			>
				<Text>{item}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
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
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		height: buttonWidth,
		borderRadius: 100,
		backgroundColor: 'red',
		margin: margin,
		alignItems: 'center',
		justifyContent: 'center'
	},
	flatlistContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
