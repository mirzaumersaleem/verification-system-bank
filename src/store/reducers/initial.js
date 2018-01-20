export const resetState = {
    user: {},
    isLoading: false,
    isUpdating: false,
    isLoggedIn: false,
    isUploading: false,
    isRegistered: false,
    customers: [],
    message: null,
    code: null,
    form: {},
    images: []
}
// let initialState = {};
let initialState = resetState;
export default function init() {
    if ((!initialState['user']) || (initialState['user'] && Object.keys(initialState['user']).length === 0)) {
        const loaddedState = localStorage.getItem('user');
        initialState = Object.assign({}, resetState);
        if (loaddedState !== null) {
            initialState['user'] = JSON.parse(loaddedState);
            initialState['isLoggedIn'] = true;
        }
    }
    return initialState;
}