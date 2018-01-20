import React, { Component } from 'react';
import { Drawer, AppBar, IconButton, Avatar, MenuItem, Card, Divider } from 'material-ui';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import Assignment from 'material-ui/svg-icons/action/assignment';

// Get background image
// import profileImage from '../images/profile-background.jpg';

// Custom files
import ImageUpload from './imageUpload'

import '../styles/css.css'
class LeftDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false, profileImage: false, currentRoute: null };
    }

    componentDidMount() {
        let currentLocation = this.props.location.pathname;
        // currentLocation = currentLocation.split("#").pop();
        setTimeout(() => {
            this.setState({ open: this.props.open, currentRoute: currentLocation })
        }, 10)
    }

    handleToggle(val, ev) {
        this.setState({ open: false });
        // let currentLocation = location.hash;
        // if (currentLocation != `#${val}`) {
        setTimeout(() => {
            this.props.close(val);
        }, 100);
        // };
    }

    // componentWillUnmount() {
    //     console.log("this runsss-- ");
    //     // this.props.close(this.state.open)
    // }

    showImageDialog() {
        this.setState({ profileImage: true })
    }

    hideImageDialog(flag, image) {
        this.setState({ profileImage: false });
        this.props.sendImage(image);
    }

    render() {
        const user = this.props.user;
        const user_name = (user && Object.keys(user).length > 0) ? `${user['first_name'].charAt(0).toUpperCase()}${user['first_name'].substring(1)}  ${user['last_name'].charAt(0).toUpperCase()}${user['last_name'].substring(1)}` : "";
        let uploader;
        if (this.state.profileImage === true) {
            uploader = <ImageUpload open={this.state.profileImage} close={this.hideImageDialog.bind(this)} />
        } else uploader = "";
        let headerArray = [
            { route: '/dashboard', iconClass: 'material-icons', iconName: "&#xE85D;", name: "Submitted Assignments" },
            { route: '/dashboard/pending', iconClass: 'material-icons', iconName: "&#xE85D;", name: "Pending Assignments" },
            { route: '/profile', iconClass: 'fa fa-user-o', iconName: "", name: "Profile" },
            { route: '/settings', iconClass: 'fa fa-cog', iconName: "", name: "Settings" },
            { route: '/helpandfeed', iconClass: 'fa fa-question-circle-o', iconName: "", name: "Help and Feedback" },
        ]

        return (
            <div>
                <Drawer open={this.state.open}>
                    <AppBar title={user_name}
                        iconElementLeft={<IconButton></IconButton>}
                        iconElementRight={<IconButton><NavigationArrowBack /></IconButton>}
                        onRightIconButtonTouchTap={this.handleToggle.bind(this, this.state.currentRoute)}
                    />
                    <div className="avatarStyle">
                        <Avatar onTouchTap={this.showImageDialog.bind(this)} src="http://www.cablesyequipos.net/images/avatar.png" size={180} className="profileAvatar" />
                    </div>
                    {headerArray.map((value) => {
                        return <Card>
                            <MenuItem onTouchTap={this.handleToggle.bind(this, value.route)}><i className={value.iconClass}>{value.iconName}</i> {value.name} </MenuItem>
                        </Card>
                    })}
                    {/* <Card>
                        <MenuItem onTouchTap={this.handleToggle.bind(this, "/dashboard")}><i className="material-icons">&#xE85D;</i> Submitted Assignments </MenuItem>
                    </Card>
                    <Divider />
                    <Card>
                        <MenuItem onTouchTap={this.handleToggle.bind(this, "/dashboard/pending")}><i className="material-icons">&#xE85D;</i> Pending Assignments </MenuItem>
                    </Card>
                    <Divider />
                    <Card>
                        <MenuItem onTouchTap={this.handleToggle.bind(this, "/profile")}> <i className="fa fa-user-o"></i> Profile </MenuItem>
                    </Card>
                    <Divider />
                    <Card>
                        <MenuItem onTouchTap={this.handleToggle.bind(this, "/settings")}> <i className="fa fa-cog" aria-hidden="true"></i> Settings </MenuItem>
                    </Card>
                    <Divider />
                    <Card>
                        <MenuItem onTouchTap={this.handleToggle.bind(this, "/helpandfeed")}> <i className="fa fa-question-circle-o" aria-hidden="true"></i> Help and Feedback </MenuItem>
                    </Card> */}
                    {uploader}
                </Drawer>
            </div>
        );
    }
}

export default LeftDrawer