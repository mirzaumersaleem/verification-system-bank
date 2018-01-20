import axios from "axios";
import firebase from 'firebase';
import { handleImageUpload, returnError, returnSuccess } from "./functions";
import store from '../store'
const url = "https://requestb.in/q59mvaq5";
// const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

let fileHelpers = {
    uploadFile: function (file, obj, dispatch) {
        // return axios.post(`${url}/${userId}/assignments`, add(data))
        return handleImageUpload(file, "dcp", obj['public_id'])
            .then((success) => {
                // success.secure_url
                let temp = { [obj.url]: success.secure_url }
                if (obj.status === "officeStatus" || obj.status === "residenceStatus") {
                    temp[obj.status] = obj['verification'];
                    temp[obj.revisionName] = obj['revision'];
                    firebase.database().ref(`/forms/${obj['userId']}/${obj['type']}`).update({ [obj.revisionName]: obj.revision });
                } else {
                    temp[obj.revisionName] = obj['revision'];
                }
                if (obj.url === "assetsUrl") {
                    temp['assets'] = "done"
                }
                firebase.database().ref(`/customers/${obj['userId']}`).update(temp)
                    .then(function (response) {
                        let obj = { message: "Successfully Added!!", status: 200 };
                        dispatch(uploadRequestSuccess(returnSuccess(null, obj)));
                    })
                    .catch(function (error) {
                        console.log('Synchronization failed', error);
                        let obj = { message: "Error, Please try again!!", status: 200 };
                        dispatch(uploadRequestFailed(returnError(obj)));
                    });
            })
            .catch((err) => dispatch(uploadRequestFailed(err)));
    },
    getFiles: function (file, dispatch) {
        // return axios.post(`${url}/${userId}/assignments`, add(data))
        return axios.get(`${url}`)
            .then((response) => dispatch(getFileRequestSuccess(response.data)))
            .catch((err) => dispatch(getFileRequestFailed(returnError(err))))
    },
}

function uploadRequestSuccess(data) {
    return {
        type: 'FILE_UPLOAD_SUCCESS',
        payload: data
    };
}

function uploadRequestFailed(error) {
    return {
        type: 'FILE_UPLOAD_FAIL',
        payload: error
    };
}

function getFileRequestSuccess(data) {
    return {
        type: 'FILE_GET_SUCCESS',
        payload: data
    };
}

function getFileRequestFailed(error) {
    return {
        type: 'FILE_GET_FAIL',
        payload: error
    };
}

// function handleImageUpload(file) {
//     return new Promise((resolve, reject) => {
//         let upload = request.post(CLOUDINARY_UPLOAD_URL)
//             .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
//             // .field('multiple', true)
//             .field('file', file)
//             .field('public_id', file.name)
//             .field('folder', "user1");

//         upload.end((err, response) => {
//             console.log("err, response", err, response)
//             if (err) {
//                 console.error("err", err);
//                 return reject(err);
//             } else if (response.body.secure_url !== '') {
//                 console.log("response.body", response.body);
//                 return resolve(response.body);
//             }
//         });
//     })
// }

export default fileHelpers;
