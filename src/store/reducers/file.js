import init, { resetState } from './initial';


const fileReducer = function (state = init(), action) {

    switch (action.type) {

        case "FILE": {
            return Object.assign({}, state, { isUploading: true, });
        }

        case "FILE_UPLOAD_SUCCESS": {
            return Object.assign({}, state, { isUploading: false });
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
            console.log(action.payload);
            return Object.assign({}, state, { isLoading: false, message: action.payload.message, code: action.payload.code, form: action.payload.form });
        }

        default:
            return state;

    }

}


export default fileReducer;