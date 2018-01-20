import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

// Material UI import
import { Paper, FloatingActionButton, DatePicker, SelectField, MenuItem, LinearProgress } from 'material-ui';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom components
import TextInput from '../components/input';
import Message from '../components/message';
import { FloatingButton } from '../components/button';


// Actions
import { AuthActions } from '../store/actions/authAction';

// Style
import Style from '../styles/style';
import '../styles/css.css';

class SignUp extends Component {
    constructor() {
        super();
        this.onSignup = this.onSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { first_name: "", last_name: "", email: "", user_name: "", password: "", "re-password": "", date_of_birth: {}, gender: "", completed: 20 }
    }

    onSignup() {
        this.props.onSignup(this.state);
    }

    handleChange(ev) {
        let new_state = this.state
        new_state[ev.target.id] = ev.target.value;
        this.setState(new_state);
    }
    handleSelectBox(name, ev, index, value) {
        let new_state = this.state
        new_state[name] = value;
        this.setState(new_state);
    }

    handleDatePicker(ev, date) {
        let new_state = this.state;
        new_state["date_of_birth"] = date;
        this.setState(new_state);
    }

    emailValidate(ev) {
        const email = this.state.email;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const currentTarget = ev.currentTarget;
        setTimeout(function () {
            if (!currentTarget.contains(document.activeElement)) {
                if (!re.test(email)) {
                    console.log("falied")
                }
            }
        }, 0);
    }

    componentWillReceiveProps(newProps) {
        newProps.user.isRegistered ? this.props.history.push('/signin') : false;
    }

    render() {
        const nameStyle = { width: '44%' }
        const otherInputStyle = { width: '94%' }
        const isLoading = this.props.isLoading;
        const status = this.props.status;
        const genders = ["Male", "Female"];
        return (
            <Paper style={Style.signupPaperStyle} zDepth={1} className="paper-container">
                <div style={{ height: "3px" }}>
                    {(isLoading === true) ? <LinearProgress mode="determinate" value={this.state.completed} /> : ""}
                </div>
                <div>
                    {(isLoading === false && status === true) ? <Message message={this.props.message} /> :
                        <form>
                            <div className="flexItems">
                                <TextInput styles={nameStyle} style={Style.firstChild} label="First name" keyName="first_name" idName="first_name" textType="text" getVal={this.handleChange} value={this.state.first_name} />
                                <TextInput styles={nameStyle} label="Last name" keyName="last_name" idName="last_name" textType="text" getVal={this.handleChange} value={this.state.last_name} />
                            </div>
                            <div onBlur={this.emailValidate.bind(this)}>
                                <TextInput styles={otherInputStyle} label="Email" keyName="email" idName="email" textType="email" getVal={this.handleChange} value={this.state.email} />
                            </div>
                            <TextInput styles={otherInputStyle} label="User name" keyName="user_name" idName="user_name" textType="text" getVal={this.handleChange} value={this.state.user_name} />
                            <div className="flexItems">
                                <DatePicker floatingLabelText="Date Of Birth" floatingLabelStyle={Style.floatingLabelStyle} underlineStyle={Style.underlineStyle} underlineFocusStyle={Style.underlineFocusStyle} floatingLabelFocusStyle={Style.floatingLabelFocusStyle} className='dobDatePicker' value={this.state['date_of_birth']} onChange={this.handleDatePicker.bind(this)} />
                                <SelectField style={{ width: '44%', textAlign: "left" }}
                                    ref="gender"
                                    name="gender"
                                    floatingLabelText="Gender"
                                    value={this.state['gender']}
                                    onChange={this.handleSelectBox.bind(this, "gender")}
                                    required={true}
                                    floatingLabelStyle={Style.floatingLabelStyle} underlineStyle={Style.underlineStyle} underlineFocusStyle={Style.underlineFocusStyle} floatingLabelFocusStyle={Style.floatingLabelFocusStyle}
                                >
                                    {genders.map((gender, index) => {
                                        return <MenuItem key={index} name="gender" value={gender} primaryText={gender} />
                                    })}

                                </SelectField>
                            </div>
                            <div className="flexItems">
                                <TextInput styles={nameStyle} label="Password" keyName="password" idName="password" textType="password" getVal={this.handleChange} value={this.state['password']} />
                                <TextInput styles={nameStyle} label="Re-Enter Password" keyName="re-password" idName="re-password" textType="password" getVal={this.handleChange} value={this.state['re-password']} />
                            </div>
                            <div style={Style.btns}>
                                <FloatingActionButton onTouchTap={this.onSignup}
                                    style={Style.signupBtn} disabled={isLoading}>
                                    <i className="fa fa-check"></i>
                                </FloatingActionButton>
                                <Link to='/signin' >
                                    <FloatingButton iconName="fa fa-sign-in" disabled={isLoading} />
                                </Link>
                            </div>
                        </form>
                    }
                </div>
            </Paper>
        );
    }
}

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return state.userReducer
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSignup: (user) => {
            dispatch(AuthActions.register(user))
        },
        // deleteUser: (user, index) => {
        //     dispatch(deleteUser(user, index))
        // },
        // updateUser: (user, index) => {
        //     dispatch(updateUser(user, index))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);