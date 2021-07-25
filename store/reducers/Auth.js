import {
	SIMPLE_LOGIN,
	SIGNUP,
	LOGIN,
	EMAIL_CHANGE,
	PASSWORD_CHANGE,
	LOADING,
	FETCH_USER_DATA,
} from "../actions/Auth";

const initialState = {
	isLoggedIn: false,
	userEmail: "",
	userPassword: "",
	idToken: "",
	uid: "",
	isLoading: false,
	userData: {},
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIMPLE_LOGIN:
			return { ...state, isLoggedIn: true };
		case EMAIL_CHANGE:
			return { ...state, userEmail: action.email };
		case PASSWORD_CHANGE:
			return { ...state, userPassword: action.password };
		case SIGNUP:
			return {
				...state,
				isLoading: false,
				userEmail: "",
				userPassword: "",
			};
		case LOGIN:
			return {
				...state,
				idToken: action.payload.idToken,
				uid: action.payload.localId,
				userData: action.userData,
				isLoggedIn: true
			};
		case LOADING:
			return { ...state, isLoading: action.payload };
		case FETCH_USER_DATA:
			return {
				...state,
				userData: action.payload,
			};
		default:
			return state;
	}
};

export default AuthReducer;
