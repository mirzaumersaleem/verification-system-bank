import axios from "axios";
import firebase from 'firebase';
import config from './config.js';
import { returnError, returnSuccess } from "./functions";
const auth_url = config['auth_url']

let add = (user) => {
    return { first_name: user['first_name'], last_name: user['last_name'], user_name: user['user_name'], email: user['email'], password: user['password'], 're-password': user['re-password'], date_of_birth: user['date_of_birth'], gender: user['gender'] }
}

let login = (user) => {
    return { email: user['email'], password: user['password'] }
}

let authHelpers = {
    addUserInfo: function (data, dispatch) {
        return axios.post(`${auth_url}/signup`, add(data))
            .then((response) => {
                dispatch(SignUpRequestSuccess(response));
            }).catch((err) => {
                console.warn("Error In  signup", err.response.data);
                dispatch(SignUpRequestFailed(returnError(err)));
            })
    },
    loginRequest: function (data, dispatch) {
        firebase.auth().signInWithEmailAndPassword(data['email'], data['password']).catch((error) => {
            // Handle Errors here.
            console.log('Errors', error);
            let str = {
                status: 'Error',
                message: 'Please try later'
            };
            if (error.code === "auth/user-not-found") {
                str.status = "Incorrect email";
                str.message = "The email you've entered is incorrect. Please try again";
                dispatch(LoginRequestFailed(returnError(str)));
            }
            else if (error.code === "auth/wrong-password") {
                str.status = "Incorrect password";
                str.message = "The password you've entered is incorrect. Please try again";
                dispatch(LoginRequestFailed(returnError(str)));
            }
            else if (error.code === "auth/network-request-failed") {
                str.status = "Network problem";
                str.message = "Network Problem. Please try again";
                dispatch(LoginRequestFailed(returnError(str)));
            }
        }).then((data) => {
            if (data) {
                firebase.database().ref(`/users/${data.uid}`).once("value", (snapshot) => {
                    const user = snapshot.val();
                    if (user) {
                        firebase.database().ref(`/users/${data.uid}`).update({ isLoggedIn: true })
                            .then(() => {
                                let obj = {
                                    payload: {
                                        displayName: data.displayName,
                                        email: user.email,
                                        emailVerified: data.emailVerified,
                                        uid: data.uid,
                                        photoURL: data.photoURL,
                                        type: user.type,
                                        name: user.name,
                                        isLoggedIn: user.isLoggedIn
                                    },
                                    message: "Successfully LoggedIn!!",
                                    status: 200
                                };
                                const toStore = JSON.stringify(obj['payload']);
                                localStorage.setItem('user', toStore);
                                dispatch(LoginRequestSuccess(returnSuccess('user', obj)));
                            })
                    }
                })

            }
            // return axios.post(`${auth_url}`, login(data))
            //     .then((response) => {
            //         const toStore = JSON.stringify({ 'user': response.data.payload });
            //         localStorage.setItem('state', toStore);
            //         console.log(toStore)
            //         dispatch(LoginRequestSuccess(returnSuccess('user', response)));
            //     }).catch((err) => {
            //         console.warn("Error In  Login", err);
            //         dispatch(LoginRequestFailed(returnError(err)));
            //     })
        })
    },
    forgotpassword: function (email, dispatch) {
        return axios.get(`${auth_url}/forgotpassword/${email}`, )
            .then((response) => {
                dispatch(ForgotpasswordRequestSuccess(returnSuccess(null, response)));
            }).catch((err) => {
                console.warn("Error In  Login", err);
                dispatch(ForgotpasswordRequestFailed(returnError(err)));
            })
    },
    logoutRequest: function (user, dispatch) {
        user['isLoggedIn'] = false,
            firebase.database().ref(`/users/${user.uid}`).update({ isLoggedIn: false }, (updated, abc) => {
                console.log("updated, abc", updated, abc);
                dispatch(LogoutRequestSuccess())
            });
        // return axios.get(`${auth_url}/logout/${userId}`)
        //     .then((response) => {
        //         setTimeout(() => dispatch(LogoutRequestSuccess(response.data)), 5000)
 
        //     }).catch((err) => {
        //         console.warn("Error In  Logout", err);
        //         dispatch(LogoutRequestFailed(returnError(err)));
        //     })
    },
    updateUserRequest: function (data, dispatch) {
        return axios.put(`${auth_url}/profile`, data)
            .then((response) => {
                dispatch(updateUserInfoRequestSuccess(returnSuccess('user', response)));
            }).catch((err) => {
                console.warn("Error In  updateuserInfo", err);
                dispatch(updateUserInfoRequestFailed(returnError(err)));
            })
    },
}

function SignUpRequestSuccess(data) {
    return {
        type: 'SIGN_UP_SUCCESS',
        payload: data
    };
}

function SignUpRequestFailed(err) {
    return {
        type: 'SIGN_UP_FAIL',
        payload: err
    };
}

function LoginRequestSuccess(data) {
    return {
        type: 'LOGIN_SUCCESS',
        payload: data
    };
}

function LoginRequestFailed(error) {
    return {
        type: 'LOGIN_FAIL',
        payload: error
    };
}

function ForgotpasswordRequestSuccess(data) {
    return {
        type: 'FORGOT_PASSWORD_SECCESS',
        payload: data
    };
}

function ForgotpasswordRequestFailed(error) {
    return {
        type: 'FORGOT_PASSWORD_FAIL',
        payload: error
    };
}

function LogoutRequestSuccess(data) {
    return {
        type: 'LOGOUT_SUCCESS',
        payload: data
    };
}

// function LogoutRequestFailed(error) {
//     return {
//         type: 'LOGOUT_FAIL',
//         payload: error
//     };
// }

function updateUserInfoRequestSuccess(data) {
    return {
        type: 'UPDATE_USER_INFO_SUCCESS',
        payload: data
    };
}

function updateUserInfoRequestFailed(err) {
    return {
        type: 'UPDATE_USER_INFO_FAIL',
        payload: err
    };
}
export default authHelpers;