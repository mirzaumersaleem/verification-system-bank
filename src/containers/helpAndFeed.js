import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'

// Material UI import
import { Paper, TextField, RaisedButton, FlatButton, Avatar, CircularProgress } from 'material-ui';

// Custom components
import { FloatingButton, FButton } from '../components/button';
import Header from './header';

// Actions
import { AuthActions } from '../store/actions/auth';

// Style
import Style from '../styles/style';
import '../styles/css.css';

class HelpAndFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        const application = this.props.user;
        if (!application.user || (application.user && Object.keys(application.user).length === 0))
            this.props.history.push('/signin')
    }
    render() {
        return (
            <div>
                <Header />
                <Paper style={Style.paperStyleProfile} zDepth={1}>
                    Sorry . Help and Feedback Will be comming soon.
                </Paper >
            </div>
        );
    }
}
// export default Profile;

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return state.userReducer
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // uploadImage: (image) => {
        //     dispatch(FileActions.uploadImage(image))
        // },
        // logout: () => {
        //     dispatch(AuthActions.logout())
        // },
        // updateUserInfo: (user) => {
        //     dispatch(AuthActions.updateUser(user))
        // }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HelpAndFeed));