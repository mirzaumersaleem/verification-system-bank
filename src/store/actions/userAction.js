import userHelpers from '../../utils/userFunctions';
import { returnError, returnSuccess } from "../../utils/functions";

export class UserActions {

    static addClientDetails(obj) {
        return dispatch => { dispatch(AddClientDetails()); userHelpers.addClientDetails(obj, dispatch); }
    }
    static getCustomers(obj) {
        return dispatch => { dispatch(GetCustomers()); userHelpers.getCustomers(dispatch); }
    }
    static resetMessageAndStatus() {
        return dispatch => { dispatch(ResetMessageAndStatus()) }
    }
    static submitForm(formData, editingUser) {
        return dispatch => { dispatch(SubmitFormRequest()); userHelpers.submitForm(formData, editingUser, dispatch); }
    }

    static getCustomerFormData(key, type, flag) {
        return dispatch => { dispatch(GetCustomerFormData()); userHelpers.getCustomerFormData(key, type, flag, dispatch); }
    }

    // static uploadFile(key, type) {
    //     return dispatch => { dispatch(GetCustomerFormData()); userHelpers.getCustomerFormData(key, type, dispatch); }
    // }

    static temporaryAddImages(images) {
        return dispatch => {
            let obj = { message: "Successfully Added!!", status: 200, payload: images };
            dispatch(TemporaryAddImagesSuccess(returnSuccess("images", obj)));
        }
    }

    static sendToDownload(key) {
        return dispatch => { dispatch(SendToDownloadRequest()); userHelpers.sendToDownload(key, dispatch); }
    }

}

function AddClientDetails() {
    return {
        type: 'ADD_CLIENT_DETIALS'
    };
}

function GetCustomers() {
    return {
        type: 'GET_CUSTOMERS'
    };
}

function ResetMessageAndStatus() {
    return {
        type: 'RESET_MESSAEG_AND_STATUS_SUCCESS',
        payload: { message: null, code: null }
    };
}

function SubmitFormRequest() {
    return {
        type: 'SUBMIT_FORM_REQUEST'
    };
}

function SendToDownloadRequest() {
    return {
        type: 'SEND_TO_DOWNLOAD_REQUEST'
    };
}

function GetCustomerFormData() {
    return {
        type: 'GET_CUSTOMER_FORM_DATA'
    };
}

function TemporaryAddImagesSuccess(payload) {
    return { type: 'TEMP_ADD_IMAGES_SUCCESS', payload: payload };
}

function TemporaryAddImagesFail() {
    return { type: 'TEMP_ADD_IMAGES_FAIL' };
}
