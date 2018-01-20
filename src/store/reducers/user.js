import init, { resetState } from './initial';


const userReducer = function (state = init(), action) {

    switch (action.type) {
        /**
         * Authentication reducer
        */
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
            console.log("resetState", resetState);
            return Object.assign({}, state, resetState);
        }

        case "LOGOUT_FAIL": {
            return Object.assign({}, state, { isLoggedIn: true, isLoading: false })
        }


        /**
         * User Reducers
         */

        case "ADD_CLIENT_DETIALS": {
            return Object.assign({}, state, { isLoading: true, message: null, code: null });
        }

        case "ADD_CLIENT_DETIALS_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, form: action.payload.form });
        }

        case "ADD_CLIENT_DETIALS_FAIL": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        case "GET_CUSTOMERS_SUCCESS": {
            return Object.assign({}, state, { message: action.payload.message, code: action.payload.code, customers: action.payload.customers });
        }

        case "GET_CUSTOMERS_FAIL": {
            return Object.assign({}, state, { message: action.payload.message, code: action.payload.code });
        }

        case "RESET_MESSAEG_AND_STATUS_SUCCESS": {
            return Object.assign({}, state, { message: action.payload.message, code: action.payload.code });
        }


        case "SUBMIT_FORM_REQUEST": {
            return Object.assign({}, state, { isLoading: true, message: null, code: null });
        }

        case "SUBMIT_FORM_REQUEST_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, form: action.payload.form });
        }

        case "SUBMIT_FORM_REQUEST_FAIL": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.data, code: action.payload.code });
        }

        case "GET_CUSTOMER_FORM_DATA": {
            return Object.assign({}, state, { isLoading: true, message: null, code: null });
        }

        case "GET_CUSTOMER_FORM_DATA_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, form: action.payload.form });
        }

        case "GET_CUSTOMER_FORM_DATA_FAIL": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        case "TEMP_ADD_IMAGES_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, images: action.payload.images });
        }

        case "TEMP_ADD_IMAGES_FAIL": {
            return Object.assign({}, state, { isUploading: false, message: action.payload.message, code: action.payload.code });
        }


        case "SEND_TO_DOWNLOAD_REQUEST": {
            return Object.assign({}, state, { isLoading: true, message: null, code: null });
        }

        case "SEND_TO_DOWNLOAD_REQUEST_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        case "SEND_TO_DOWNLOAD_REQUEST_ERROR": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code });
        }

        /**
         *  File Reducer
         */

        case "FILE": {
            return Object.assign({}, state, { isUploading: true, });
        }

        case "FILE_UPLOAD_SUCCESS": {
            return Object.assign({}, state, { isUploading: false, message: action.payload.message, code: action.payload.code });
        }

        case "FILE_UPLOAD_FAIL": {
            return Object.assign({}, state, { isUploading: false });
        }

        case "TEMP_ADD_IMAGES_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, images: action.payload.images });
        }

        case "TEMP_ADD_IMAGES_FAIL": {
            return Object.assign({}, state, { isUploading: false, message: action.payload.message, code: action.payload.code });
        }

        case "RESET_FORM_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, form: action.payload.form });
        }

        case "RESET_IMAGES_SUCCESS": {
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, images: action.payload.images });
        }

        default:
            return state;

    }

}


export default userReducer;