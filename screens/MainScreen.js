import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {ActivityIndicator} from 'react-native-paper'

import NagivationBar from "../components/NavigationBar";
import allScreensTab from "../data/AllTabScreenData";
import AuthScreen from "../screens/AuthScreen";

const MainScreen = (props) => {
	const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
	const isLoading = useSelector((state) => state.Auth.isLoading);

	if (!isLoggedIn) {
		return (
			<View style={{flex: 1}}>
				<AuthScreen />
				{isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator}/>}
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<NagivationBar allScreens={allScreensTab} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		height: "100%",
	},
	loadingIndicator: {
		position: 'absolute',
		right: "50%",
		left: '50%',
		top: '50%',
		bottom: '50%'
	}
});

export default MainScreen;
