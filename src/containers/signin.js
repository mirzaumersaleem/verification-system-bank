import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Material UI import
import { Paper, FloatingActionButton, LinearProgress, FlatButton } from 'material-ui';

// Custom components
import TextInput from '../components/input';
// import Toast from '../components/toast';
import { FloatingButton } from '../components/button';

// Actions
import { AuthActions } from '../store/actions';

// Style
import Style from '../styles/style';


class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
            isloading: false,
            message: "",
            show_message: false,
        }
    }

    handleChange(ev) {
        let newState = this.state
        newState[ev.target.id] = ev.target.value;
        newState['show_message'] = false;
        newState['message'] = "";
        this.setState(newState)
    }

    handleSubmit(ev) {
        ev.preventDefault();
        if (this.state.email.length === "" || this.state.password === "") {
            this.setState({ show_message: true, message: "Please Fill All Fields" })
        } else this.props.onLogin(this.state);
    }

    componentWillMount() {
        let { user } = this.props;
        if (user && Object.keys(user).length === 0) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user && Object.keys(user).length > 0) {
            setTimeout(() => {
                (user['type'] === "secondary") ? this.props.history.push('/dashboard') :
                    (user['type'] === "primary") ? this.props.history.push('/admin') : null
            }, 150)
        }
    }
    componentWillReceiveProps(newProps) {
        let newState = this.state;
        newState['isloading'] = newProps.isloading;
        const { user } = newProps;
        if (newProps.isLoggedIn) {
            (user['type'] === "secondary") ? this.props.history.push('/dashboard') :
                (user['type'] === "primary") ? this.props.history.push('/admin') : null;
        } else if (!newProps.isloading && !newProps.isLoggedIn && Object.keys(newProps.user).length === 0 && newProps.message != null) {
            newState['show_message'] = !newState['show_message'];
            toast.error(newProps.message);
        }
        this.setState(newState)
    }
    handleForgot() {
        this.props.history.push('/forgotpassword')
    }
    closingRequest() { }

    render() {
        const { isLoading } = this.props;
        return (
            <Paper style={Style.paperStyle} zDepth={1}>
                <div style={{ height: "3px" }}>
                    {(isLoading === true) ? <LinearProgress mode="determinate" value={this.state.completed} /> : ""}
                </div>
                <img src={require("../images/logoColored.jpg")} style={{ width: '320px' }} />
                <form>
                    <TextInput styles={Style.firstChild} label="Email" keyName="email" idName="email" textType="email" getVal={this.handleChange} value={this.state.email} />
                    <TextInput label="Password" keyName="password" idName="password" textType="password" getVal={this.handleChange} value={this.state.password} />
                    <br />
                    <div style={Style.btns}>
                        <FloatingActionButton onTouchTap={this.handleSubmit}
                            style={Style.signupBtn} disabled={isLoading}
                            backgroundColor={Style.loginBtnColor}>
                            <i className="fa fa-sign-in"></i>
                        </FloatingActionButton>
                        {/* <Link to='/signup' >
                            <FloatingButton iconName="fa fa-plus" disabled={isLoading} />
                        </Link> */}
                    </div>
                    {/* <div style={Style.forgotPassword}>
                        <FlatButton
                            label="Forgot Password ?" disabled={isLoading}
                            onTouchTap={this.handleForgot.bind(this)} />
                    </div> */}
                    {/* {isLoading && <CircularProgress size={30} style={{ top: 10, left: 10 }} />} */}
                </form>
                <div>
                    <ToastContainer
                        style={{ zIndex: 999999 }}
                        position="top-center"
                        type="default"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                    />
                </div>
            </Paper >
        );
    }
}

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return state.userReducer
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onLogin: (user) => {
            dispatch(AuthActions.login(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);