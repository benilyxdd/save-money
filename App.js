import React from "react";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import MainScreen from "./screens/MainScreen";
import Auth from "./store/reducers/Auth";
import AppData from "./store/reducers/AppData";
import Transactions from "./store/reducers/Transactions";

enableScreens();

const rootReducer = combineReducers({
	Auth: Auth,
	AppData: AppData,
	Transactions: Transactions,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
	return (
		<Provider store={store}>
			<MainScreen />
		</Provider>
	);
}
