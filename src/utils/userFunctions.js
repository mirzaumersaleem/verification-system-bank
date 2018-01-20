import axios from "axios";
import firebase from 'firebase';
import config from './config.js';
import store from '../store';
import { returnError, returnSuccess } from "./functions";
const auth_url = config['auth_url']

let add = (user) => {
    return { first_name: user['first_name'], last_name: user['last_name'], user_name: user['user_name'], email: user['email'], password: user['password'], 're-password': user['re-password'], date_of_birth: user['date_of_birth'], gender: user['gender'] }
}

let login = (user) => {
    return { email: user['email'], password: user['password'] }
}

let userHelpers = {
    getCustomers: function (dispatch) {
        const { user } = store.getState().userReducer;
        firebase.database().ref(`/customers`).on("value", (snapshot) => {
            let obj = {}
            const customers = snapshot.val();
            if (customers) {
                for (let key in customers) {
                    customers[key]['key'] = key;
                }
                const customersArray = Object.values(customers);
                obj = { message: "success", code: 200, payload: customersArray }
            } else { obj = { message: "success", code: 200, payload: [] } }
            dispatch(GetCustomersSuccess(returnSuccess('customers', obj)));
        })
        // if (user['type'] === 'primary') {
        //     firebase.database().ref(`/customers`).on("value", (snapshot) => {
        //         let obj = {}
        //         const customers = snapshot.val();
        //         if (customers) {
        //             for (let key in customers) {
        //                 customers[key]['key'] = key;
        //             }
        //             const customersArray = Object.values(customers);
        //             obj = { message: "success", code: 200, payload: customersArray }
        //         } else { obj = { message: "success", code: 200, payload: [] } }
        //         dispatch(GetCustomersSuccess(returnSuccess('customers', obj)));
        //     })
        // } else if (user['type'] === 'secondary') {
        //     firebase.database().ref(`/customers`).orderByChild("sent").equalTo(true).on("value", (snapshot) => {
        //         let obj = {}
        //         const customers = snapshot.val();
        //         if (customers) {
        //             for (let key in customers) {
        //                 customers[key]['key'] = key;
        //             }
        //             const customersArray = Object.values(customers);
        //             obj = { message: "success", code: 200, payload: customersArray }
        //         } else { obj = { message: "success", code: 200, payload: [] } }
        //         dispatch(GetCustomersSuccess(returnSuccess('customers', obj)));
        //     })
        // }
        // .catch((error) => dispatch(GetCustomersError(returnError(error))))
    },

    addClientDetails: function (data, dispatch) {
        const key = firebase.database().ref(`/customers`).push();
        key.set(data)
            .then(function (response) {
                let obj = { message: "Successfully Added!!", status: 200 };
                dispatch(AddClientDetailsSuccess(returnSuccess(null, obj)));
            })
            .catch(function (error) {
                console.log('Synchronization failed', error);
                let obj = { message: "Error, Please try again!!", status: 200 };
                dispatch(AddClientDetailsError(returnError(obj)));
            });
    },
    submitForm: function (formData, editingUser, dispatch) {
        formData['user'] = editingUser['key'];
        formData['CNIC'] = editingUser['CNIC'];
        firebase.database().ref(`/forms/${editingUser['key']}/${formData['type']}`).set(formData)
            .then(function (response) {
                let obj = { message: "Successfully Added!!", status: 200, payload: formData };
                dispatch(SubmitFormRequestSuccess(returnSuccess('form', obj)));
                // const type = (formData['type'] === "Residence") ? "residenceStatus" : "officeStatus";
                // firebase.database().ref(`/customers/${editingUser['key']}`).update({ [type]: formData['verification'] })
                //     .then(function (response) {
                //         let obj = { message: "Successfully Added!!", status: 200, payload: formData };
                //         dispatch(SubmitFormRequestSuccess(returnSuccess('form', obj)));
                //     })
                //     .catch(function (error) {
                //         console.log('Synchronization failed', error);
                //         let obj = { message: "Error, Please try again!!", status: 200 };
                //         dispatch(SubmitFormRequestSuccess(returnError(obj)));
                //     });
            })
            .catch(function (error) {
                console.log('Synchronization failed', error);
                let obj = { message: "Error, Please try again!!", status: 200 };
                dispatch(SubmitFormRequestSuccess(returnError(obj)));
            });
    },
    getCustomerFormData: function (key, type, flag, dispatch) {
        const { form } = store.getState().userReducer;
        if ((form && Object.keys(form).length === 0) || !flag) {
            console.log(flag);
            firebase.database().ref(`/forms/${key}/${type}`).once("value", (snapshot) => {
                let obj = {}
                const form = snapshot.val();
                obj = { message: "success", code: 200, payload: form }
                dispatch(GetCustomerFormDataSuccess(returnSuccess('form', obj)));
            })
        } else {
            let obj = { message: "success", code: 200, payload: form }
            dispatch(GetCustomerFormDataSuccess(returnSuccess('form', obj)));
        }
        // .catch((error) => dispatch(GetCustomersError(returnError(error))))
    },
    sendToDownload: function (key, dispatch) {
        const { form } = store.getState().userReducer;
        firebase.database().ref(`/customers/${key}`).update({ completed: true, sent: true })
            .then(function (response) {
                let obj = { message: "Successfully Added!!", status: 200 };
                dispatch(SendToDownloadSuccess(returnSuccess(null, obj)));
            })
            .catch(function (error) {
                console.log('Synchronization failed', error);
                let obj = { message: "Error, Please try again!!", status: 200 };
            })
    },
}

function GetCustomersSuccess(data) {
    return {
        type: 'GET_CUSTOMERS_SUCCESS',
        payload: data
    };
}
function GetCustomersError(data) {
    return {
        type: 'GET_CUSTOMERS_FAIL',
        payload: data
    };
}

function AddClientDetailsSuccess(data) {
    return {
        type: 'ADD_CLIENT_DETIALS_SUCCESS',
        payload: data
    };
}
function AddClientDetailsError(data) {
    return {
        type: 'ADD_CLIENT_DETIALS_FAIL',
        payload: data
    };
}

function SubmitFormRequestSuccess(data) {
    return {
        type: 'SUBMIT_FORM_REQUEST_SUCCESS',
        payload: data
    };
}
function SubmitFormRequestError(data) {
    return {
        type: 'SUBMIT_FORM_REQUEST_FAIL',
        payload: data
    };
}

function GetCustomerFormDataSuccess(data) {
    return {
        type: 'GET_CUSTOMER_FORM_DATA_SUCCESS',
        payload: data
    };
}

function SendToDownloadSuccess(data) {
    return {
        type: 'SEND_TO_DOWNLOAD_REQUEST_SUCCESS',
        payload: data
    };
}
function SendToDownloadError(data) {
    return {
        type: 'SEND_TO_DOWNLOAD_REQUEST_ERROR',
        payload: data
    };
}

export default userHelpers;