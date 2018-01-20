import authHelpers from '../../utils/authFunctions';

export class AuthActions {

    static register(user) {
        return dispatch => { dispatch(SignUpRequest()); authHelpers.addUserInfo(user, dispatch); }
    }

    static login(credentials) {
        return dispatch => { dispatch(LoginRequest()); authHelpers.loginRequest(credentials, dispatch); }
    }

    static forgotpassword(email) {
        return dispatch => { dispatch(Forgotpassword()); authHelpers.forgotpassword(email, dispatch); }
    }

    static logout(user) {
        return dispatch => { dispatch(LogoutRequest()); authHelpers.logoutRequest(user, dispatch); }
    }
}

function SignUpRequest() {
    return {
        type: 'SIGN_UP'
    };
}

function LoginRequest() {
    return {
        type: 'LOGIN'
    };
}

function Forgotpassword() {
    return {
        type: 'FORGOT_PASSWORD'
    };
}

function LogoutRequest() {
    return {
        type: 'LOGOUT'
    };
}
