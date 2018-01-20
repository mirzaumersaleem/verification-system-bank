import React, { Component } from 'react';
import { AppBar, FlatButton, IconButton } from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
class HeaderView extends Component {


    render() {
        const user = this.props.user;
        return (
            <div style={{ margin: '0px' }}>
                <AppBar style={{ margin: '0px', backgroundColor: "#008080" }} //rgb(255, 97, 85), rgb(106, 200, 170)
                    title={<img src={require("../images/logoColored.webp")} style={{ height: "75px", paddingBottom:'8px' }} alt="Company LOGO" />}
                    iconElementRight={<FlatButton label={this.props.label} icon={<i className="fa fa-sign-out"></i>} />}
                    iconStyleLeft={{ visibility: 'hidden' }}
                    iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
                    onRightIconButtonTouchTap={this.props.logout} />
            </div>
        )
    }
}
export default HeaderView