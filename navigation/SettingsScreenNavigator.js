import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";

import SettingsScreen from "../screens/TabScreen/SettingsScreen";
import Categories from "../screens/SettingsScreen/Categories";
import RecurringTransactions from "../screens/SettingsScreen/RecurringTransactions";
import MainCurrency from "../screens/SettingsScreen/MainCurrency";
import SubCurrency from "../screens/SettingsScreen/SubCurrency";
import Theme from "../screens/SettingsScreen/Theme";
import AddCategory from "../screens/SettingsScreen/AddCategory";
import SubmitFeedback from "../screens/SettingsScreen/SubmitFeedback";
import Accounts from "../screens/SettingsScreen/Accounts";
import AddAccount from "../screens/SettingsScreen/AddAccount";

import { addCategory, resetInputCategory } from "../store/actions/Category";
import { fetchUserData } from "../store/actions/Auth";
import { submitFeedback } from "../store/actions/Feedback";

const SettingsStack = createStackNavigator();

const SettingScreenNavigator = (props) => {
	const dispatch = useDispatch();
	const inputCategory = useSelector((state) => state.Category.inputCategory);
	const categoriesList = useSelector(
		(state) => state.Auth.userData.basicInfo.categories
	);
	const uid = useSelector((state) => state.Auth.uid);
	const inputDetail = useSelector((state) => state.Feedback.detail);
	const inputSubject = useSelector((state) => state.Feedback.subject);

	const addAccountButton = () => {
		return (
			<IconButton
				icon="plus"
				color="green"
				size={30}
				onPress={() => {
					dispatch(resetInputCategory());
					props.navigation.navigate("Add Account");
				}}
			/>
		);
	};

	const confirmAddAccountButton = () => {
		return (
			<IconButton
				icon="check"
				color="green"
				size={30}
				onPress={() => {
					console.log("hi");
				}}
			/>
		);
	};

	const addCategoryButton = () => {
		return (
			<IconButton
				icon="plus"
				color="green"
				size={30}
				onPress={() => {
					dispatch(resetInputCategory());
					props.navigation.navigate("Add Category");
				}}
			/>
		);
	};

	const addAndUpdateCategory = () => {
		return async (dispatch) => {
			await dispatch(
				addCategory(
					uid,
					categoriesList ? categoriesList : [],
					inputCategory
				)
			);
			await dispatch(fetchUserData(uid));
			props.navigation.navigate("Categories");
		};
	};

	const confirmAddCategoryButton = () => {
		return (
			<IconButton
				icon="check"
				color="green"
				size={30}
				onPress={() => {
					if (!inputCategory) {
						Alert.alert("Error", "You cannot add empty category");
						return;
					}
					if (
						categoriesList &&
						categoriesList.includes(inputCategory)
					) {
						Alert.alert("Error", "You cannot add a category twice");
						return;
					}
					dispatch(addAndUpdateCategory());
				}}
			/>
		);
	};

	const submitFeedbackAndGoBack = () => {
		return async (dispatch) => {
			await dispatch(submitFeedback(uid, inputSubject, inputDetail));
			props.navigation.navigate("SettingsMain");
		};
	};

	const submitFeedbackButton = () => {
		return (
			<IconButton
				icon="check"
				color="green"
				size={30}
				onPress={() => {
					if (!uid) {
						Alert.alert(
							"Error",
							"You somehow log in without logging in"
						);
						return;
					}
					if (!inputDetail || !inputSubject) {
						Alert.alert("Error", "Input cannot be empty");
						return;
					}
					dispatch(submitFeedbackAndGoBack());
				}}
			/>
		);
	};

	return (
		<SettingsStack.Navigator>
			<SettingsStack.Screen
				name="SettingsMain"
				component={SettingsScreen}
			/>
			<SettingsStack.Screen
				name="Categories"
				component={Categories}
				options={{ headerRight: addCategoryButton }}
			/>
			<SettingsStack.Screen
				name="Accounts"
				component={Accounts}
				options={{ headerRight: addAccountButton }}
			/>
			<SettingsStack.Screen
				name="Recurring Transactions"
				component={RecurringTransactions}
			/>
			<SettingsStack.Screen
				name="Main Currency"
				component={MainCurrency}
			/>
			<SettingsStack.Screen name="Sub Currency" component={SubCurrency} />
			<SettingsStack.Screen name="Theme" component={Theme} />
			<SettingsStack.Screen
				name="Add Category"
				component={AddCategory}
				options={{ headerRight: confirmAddCategoryButton }}
			/>
			<SettingsStack.Screen
				name="Add Account"
				component={AddAccount}
				options={{ headerRight: confirmAddAccountButton }}
			/>
			<SettingsStack.Screen
				name="Submit Feedback"
				component={SubmitFeedback}
				options={{ headerRight: submitFeedbackButton }}
			/>
		</SettingsStack.Navigator>
	);
};

export default SettingScreenNavigator;
