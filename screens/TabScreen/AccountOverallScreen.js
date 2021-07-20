import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import AccountPicker from "../../components/AccountPicker";

const ExpenseScreen = () => {
	const [content, setContent] = useState("a");

	return (
		<View style={styles.screen}>
			<AccountPicker onChangeAccount={(value) => setContent(value)} />
			<Text>{content[0]}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default ExpenseScreen;
