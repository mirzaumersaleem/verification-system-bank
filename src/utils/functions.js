import request from "superagent";
const CLOUDINARY_UPLOAD_PRESET = 'emrpal5m';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/mtahir/auto/upload';

export function handleImageUpload(file, folderName, userId) {
    console.log(file, folderName, userId)
    return new Promise((resolve, reject) => {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            // .field('multiple', true)
            .field('file', file)
            .field('public_id', userId)
            .field('folder', folderName || "dcp");

        upload.end((err, response) => {
            if (err) {
                console.error("err", err);
                return reject(err);
            } else if (response.body.secure_url !== '') {
                return resolve(response.body);
            }
        });
    })
}

export function returnError(err) {
    if (!err.status) {
        return { message: err, code: 123456789 }
    }
    return { message: err.message, code: err.status }
}

export function returnSuccess(payload_type, data) {
    if (payload_type !== null)
        return { message: data.message, code: data.status || data.code, [payload_type]: data.payload }
    return { message: data.message, code: data.status }
}

export function validator(value, length, isSubmitting) {
    return (isSubmitting === true) ? value.length < length : false;
}
export function radioBtnValidator(name, isSubmitting) {
    return (isSubmitting === true) ? (name == undefined || name == null || name == "") : false;
}
export function selectBoxValidator(name, isSubmitting) {
    return (isSubmitting === true) ? (name == undefined || name == null || name == "") : false;
}