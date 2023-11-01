import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width
const buttonWidth = screenWidth / 5.5
const margin = buttonWidth / 11

export const getButtonWidth = (value: string) => {
	return value === '0' ? (buttonWidth + margin) * 2 : buttonWidth;
}

export const styles = StyleSheet.create({
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