import React, { Component } from 'react';
import { AppBar, FlatButton, IconButton} from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import LeftDrawer from './drawer.jsx';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { openDrawer: false }
    }

    openLeftDrawer() {
        this.setState({ openDrawer: !this.state.openDrawer });
        this.props.toggleCreateDrawer(false);
    }
    componentWillReceiveProps(newProps, newState) {
        (newProps.toggle === true) ? this.setState({ openDrawer: false }) : "";
    }
    closeLeftDrawer(routing) {
        this.setState({ openDrawer: !this.state.openDrawer });
        this.props.changeRoute(routing)
    }

    sendImage(image) {
        this.setState({ openDrawer: !this.state.openDrawer });
        this.props.image(image);
    }

    sendThis(returnedValue) {
        // this.props.checkThis(returnedValue);
    }

    toggleCreateAssignmentDrawer() {
        this.props.toggleCreateDrawer(true);
    }

    logout(ev) {
        this.props.logout();
    }

    render() {
        const user = this.props.user;
        let drawer;
        if (this.state.openDrawer === true) {
            console.log(this.props.type);
            (this.props.type === 1) ? drawer = <LeftDrawer open={this.state.openDrawer} close={this.closeLeftDrawer.bind(this)} sendImage={this.sendImage.bind(this)} location={this.props.location} user={user}/> :
                (this.props.type === 2) ? drawer = <AdminLeftDrawer open={this.state.openDrawer} close={this.closeLeftDrawer.bind(this)} sendImage={this.sendImage.bind(this)} openCreateAssignmentDrawer={this.toggleCreateAssignmentDrawer.bind(this)} location={this.props.location} user={user}/> :
                    (this.props.type === 3) ? drawer = "" :
                        drawer = ""
        } else drawer = "";
        // const user_name = (user && Object.keys(user).length > 0) ? `${user['first_name'].toUpperCase()}  ${user['last_name'].toUpperCase()}` : "";
        return (
            <div style={{ margin: '0px' }}>
                <AppBar style={{ margin: '0px' }}
                    title={<img src="http://res.cloudinary.com/mtahir/image/upload/v1501066537/logo_wn52up.png" style={{height:"75px"}} alt="Company LOGO"/>}
                    iconElementRight={<FlatButton label={this.props.label} icon={<i className="fa fa-sign-out"></i>} />}
                    iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
                    onLeftIconButtonTouchTap={this.openLeftDrawer.bind(this)}
                    onRightIconButtonTouchTap={(this.logout.bind(this))}
                />
                {drawer}
            </div>
        )
    }
}
export default Header