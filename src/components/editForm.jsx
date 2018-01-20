import React, { Component } from 'react';
import { Dialog, FlatButton, SelectField, MenuItem, Divider, RaisedButton, List, Subheader, ListItem } from 'material-ui';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// Styles
import '../styles/css.css';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            file: null,
            images: [],
            selectedFileName: null,
            pending_assignments: [],
            selected_assignment: "",
            message: null,
            status_code: null,
            show_message: false,
        }
    }

    componentWillMount() {
        this.setState({ open: this.props.open });
    }

    handleClose(btn, ev) {
        // if (btn === 'submit') {
        //     if (this.state.images.length > 0) {
        //         this.props.addTempImages(this.state.images);
        //         this.setState({ open: false });
        //         setTimeout(() => { this.props.close(btn) }, 150);
        //     }
        //     else toast.error("Please select at-least one image.");
        // } else {
        this.setState({ open: false });
        setTimeout(() => { this.props.close(null) }, 150);

        // }
    }
    showFormOrImage(value, type, typeStatus) {
        this.setState({ open: !this.state.open });
        setTimeout(() => { this.props.close(value, type, typeStatus) }, 100);
    }
    render() {
        const { editingUser } = this.props;
        const actions = [
            // <FlatButton label="Submit" primary={true} onTouchTap={this.handleClose.bind(this, 'submit')} />,
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleClose.bind(this, 'cancel')} />,
        ];
        return (<Dialog actions={actions} modal={true}
            open={this.state.open} onRequestClose={this.handleClose}>
            <div className="fieldsWrapper">
                <List>
                    <Subheader>Please Select What You want to modify:</Subheader>
                    <Divider />
                    {(editingUser['residenceStatus'] === "" || !editingUser['residenceStatus']) ? null :
                        <div>
                            <ListItem
                                primaryText="Residence Form"
                                rightIcon={<ModeEdit />}
                                onClick={this.showFormOrImage.bind(this, "Residence", "residenceStatus")}
                            />
                            <ListItem
                                primaryText="Residence Images"
                                rightIcon={<ModeEdit />}
                                onClick={this.showFormOrImage.bind(this, "residenceImageUrl", "Residence", "residenceStatus")}
                            />
                        </div>}
                    {(editingUser['officeStatus'] === "" || !editingUser['officeStatus']) ? null :
                        <div>
                            <ListItem
                                primaryText="Office Form"
                                rightIcon={<ModeEdit />}
                                onClick={this.showFormOrImage.bind(this, "Office", "officeStatus")}
                            />
                            <ListItem
                                primaryText="Office Images"
                                rightIcon={<ModeEdit />}
                                onClick={this.showFormOrImage.bind(this, "officeImageUrl", "Office", "officeStatus")}
                            />
                        </div>}
                    {/* {(editingUser['residenceStatus'] === "" || !editingUser['residenceStatus'])?
                        <div><Subheader>Do you want to add Residence Form?:</Subheader>
                        <Divider />
                        <ListItem
                                primaryText="Residence Form"
                                rightIcon={<ModeEdit />}
                                onClick={this.showFormOrImage.bind(this, "Residence", "residenceStatus")}
                                rightIconButton={<RaisedButton label="Add" icon={<i className="fa fa-plus"></i>}  onTouchTap={this.addForm.bind(this, "residenceImageUrl", "Residence", "residenceStatus")} />}
                            />
                        </div>:""}
                        {(editingUser['officeStatus'] === "" || !editingUser['officeStatus'])?
                        <div><Subheader>Do you want to add Office Form?:</Subheader>
                        <Divider />
                        <ListItem
                                primaryText="Office Form"
                                rightIconButton={<RaisedButton label="Add" icon={<i className="fa fa-plus"></i>} style={{height:'100%'}} onTouchTap={this.addForm.bind(this, "residenceImageUrl", "Residence", "residenceStatus")} />}
                                />
                        </div>:""} */}
                    {/* <ListItem
                        primaryText="Pay Slip"
                        rightIcon={<ModeEdit />}
                        onClick={this.showFormOrImage.bind(this, "assets")}
                    /> */}
                </List>
            </div>
            <ToastContainer
                style={{ zIndex: 999999 }}
                position="top-center"
                type="default"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
        </Dialog>);
    }
}


export default EditForm;