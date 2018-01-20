import init, { resetState } from './initial';


const authReducer = function (state = init(), action) {

    switch (action.type) {

        case "LOAD_STATE_SUCCESS": {
            const newState = Object.assign({}, state, action.payload);
            return newState
        }

        case "INITIAL_STATE": {
            return state
        }

        case "SIGN_UP": {
            return Object.assign({}, state, { isRegistered: false, isLoading: true });
        }

        case "SIGN_UP_SUCCESS": {
            return Object.assign({}, state, { isRegistered: true, isLoading: false, user: action.payload.user, code: action.payload.code });
        }

        case "SIGN_UP_FAIL": {
            return Object.assign({}, state, { isRegistered: false, isLoading: false, message: action.payload.data, code: action.payload.code });
        }

        case "LOGIN": {
            return Object.assign({}, state, { isLoggedIn: false, isLoading: true });
        }

        case "LOGIN_SUCCESS": {
            return Object.assign({}, state, { isLoggedIn: true, user: action.payload.user, isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        case "LOGIN_FAIL": {
            return Object.assign({}, state, { isLoggedIn: false, isLoading: false, message: action.payload.message, code: action.payload.code })
        }

        case "FORGOT_PASSWORD": {
            return Object.assign({}, state, { isLoading: true });
        }

        case "FORGOT_PASSWORD_SECCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        case "FORGOT_PASSWORD_FAIL": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code })
        }

        case "LOGOUT": {
            return Object.assign({}, state, { isLoading: true });
        }

        case "LOGOUT_SUCCESS": {
            localStorage.removeItem("user");
            return Object.assign({}, state, resetState);
        }

        case "LOGOUT_FAIL": {
            return Object.assign({}, state, { isLoggedIn: true, isLoading: false })
        }

        default:
            return state;

    }

}

export default authReducer;