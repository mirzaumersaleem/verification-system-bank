import fileHelpers from '../../utils/fileFunctions';
import { returnError, returnSuccess } from "../../utils/functions";

export class FileActions {

    static uploadFile(file, obj) {
        return dispatch => { dispatch(FileRequest()); fileHelpers.uploadFile(file, obj, dispatch); }
    }

    static temporaryAddImages(images) {
        return dispatch => {
            let obj = { message: "Successfully Added!!", status: 200, payload: images };
            dispatch(TemporaryAddImagesSuccess(returnSuccess("images", obj)));
        }
    }
    static resetForm() {
        return dispatch => {
            let obj = { message: null, status: null, payload: {} };
            dispatch(ResetFormSuccess(returnSuccess('form', obj)));
        }
    }
    static resetImages() {
        return dispatch => {
            let obj = { message: null, status: null, payload: [] };
            dispatch(ResetImagesSuccess(returnSuccess('images', obj)));
        }
    }
}

function FileRequest() {
    return { type: 'FILE' };
}

function TemporaryAddImagesSuccess(payload) {
    return { type: 'TEMP_ADD_IMAGES_SUCCESS', payload: payload };
}

function TemporaryAddImagesFail() {
    return { type: 'TEMP_ADD_IMAGES_FAIL' };
}

function ResetFormSuccess(payload) {
    return { type: 'RESET_FORM_SUCCESS', payload: payload };
}
function ResetImagesSuccess(payload) {
    return { type: 'RESET_IMAGES_SUCCESS', payload: payload };
}

// function TemporaryGetImagesFail() {
//     return { type: 'TEMP_GET_IMAGES_FAIL' };
// }
