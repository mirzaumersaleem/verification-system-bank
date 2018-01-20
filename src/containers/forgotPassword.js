import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
// import { addUser, deleteUser, updateUser } from '../store/actions/index';


// Material UI import
import { Paper, LinearProgress } from 'material-ui';

// Custom components
import TextInput from '../components/input';
import { FloatingButton } from '../components/button';
// import Toast from '../components/toast';

// Actions
import { AuthActions } from '../store/actions/auth';
import { LoadActions } from '../store/actions/loadAction';

// Style
import Style from '../styles/style';


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            isloading: false
        }
    }

    handleChange(ev) {
        let newState = this.state
        newState[ev.target.id] = ev.target.value;
        this.setState(newState)
    }

    handleSubmit(ev) {
        // ev.preventDefault();
        if (this.state.email === "" || this.state.email.length === 0) return this.props.resetStatusAndMessage(null, "Please enter email first.")
        this.props.onForgotpassword(this.state.email);
    }

    componentWillReceiveProps(newProps) {
        let newState = this.state
        newState['isloading'] = newProps.isloading;
        this.setState(newState)
        newProps.isLoggedIn ? this.props.history.push('/dashboard') : false;
    }
    closingRequest() { }
    render() {
        let isLoading = this.props.isLoading

console.log((isLoading === false && this.props.message !== null && this.props.code !== 200 && this.props.code !== null))
        return (
            <Paper style={Style.paperStyle} zDepth={1}>
                <div style={{ height: "3px" }}>
                    {(isLoading === true) ? <LinearProgress mode="determinate" value={this.state.completed} /> : ""}
                </div>
                <div>
                    <img src="http://res.cloudinary.com/mtahir/image/upload/v1501066537/logo_wn52up.png" alt="Company logo" />
                </div>

                <TextInput styles={Style.firstChild} label="Email" keyName="email" idName="email" textType="email" getVal={this.handleChange} value={this.state.email} disabled={isLoading} />
                <br />
                <div style={Style.btns}>
                    <FloatingButton iconName="fa fa-check" btnAction={this.handleSubmit.bind(this)} disabled={isLoading} />
                    <Link to='/signin' >
                        <FloatingButton iconName="fa fa-sign-in" disabled={isLoading} />
                    </Link>
                </div>
                {/* {(isLoading === false && this.props.message !== null && this.props.code !== 200 && this.props.code !== null) ? <Toast message={this.props.message} bgColor="red" closingRequest={this.closingRequest.bind(this)} /> : ""} */}

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
        onForgotpassword: (email) => dispatch(AuthActions.forgotpassword(email)),
        resetStatusAndMessage: (code, msg) => dispatch(LoadActions.resetStatusAndMessage(code, msg)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword));