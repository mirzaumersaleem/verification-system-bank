import React, { Component } from 'react';
import { Dialog, FlatButton, SelectField, MenuItem, Divider, RadioButtonGroup, RadioButton } from 'material-ui';
import * as mat from 'material-ui';
import MaskedInput from 'react-text-mask'

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// Custome components
import Style from '../styles/style';

// Styles
import '../styles/css.css';
import Toast from './toast';


class AddClientDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            customer: {
                name: "",
                CNIC: "",
                residenceAddress: "",
                workAddress: "",
                officeStatus: "",
                residenceStatus: "",
                assets: ""
            }
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ open: this.props.open })
        }, 10)
    }

    handleToggle(val, ev) {
        this.setState({ open: false });
        setTimeout(() => {
            this.props.close(val);
        }, 100)
    }

    handleChange(name, value) {
        let newState = this.state;
        newState.customer[name] = value
        this.setState(newState)
    }

    inputTest(id, length) {
        const { customer } = this.state;
        if (customer[id].length < 3) { }
    }

    sendInToDb() {
        const { customer } = this.state;
        if (customer.name === "" || customer.CNIC === "") {
            toast.error("Please Fill at least name and CNIC");
            return;
        } else if (customer.residenceAddress !== "" && customer.workAddress !== "") {
            customer["residenceStatus"] = "Pending";
            customer["officeStatus"] = "Pending";
            customer["residenceImageRevise"] = 0;
            customer["officeImageRevise"] = 0;
            this.setState({ customer })
        } else if (customer.residenceAddress !== "") {
            customer["residenceStatus"] = "Pending";
            customer["residenceImageRevise"] = 0;
            this.setState({ customer })
        } else if (customer.workAddress !== "") {
            customer["officeStatus"] = "Pending";
            customer["officeImageRevise"] = 0;
            this.setState({ customer });
        }
        this.props.sendInToDb(this.state.customer);
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.isLoading && newProps.message && newProps.code) this.handleToggle();
    }

    render() {
        const [{ isLoading }, { customer }] = [this.props, this.state];
        let iconLabel = "";
        if (isLoading) iconLabel = <mat.CircularProgress size={30} />
        else iconLabel = <i className="fa fa-user-plus"></i>;
        const actions = [
            //     <FlatButton label="Submit" primary={true} onTouchTap={this.handleToggle.bind(this, 'submit')} />,
            //     <FlatButton label="Cancel" secondary={true} onTouchTap={this.handleToggle.bind(this, 'cancel')} />,
            <mat.RaisedButton label="Add" labelColor='#808080' icon={iconLabel} style={{ color: 'gray', marginRight: '10px' }} labelStyle={{ fontWeight: "bold" }} onTouchTap={this.sendInToDb.bind(this)} disabled={isLoading} />,
            <mat.RaisedButton label="Cancel" labelColor='#fff' labelStyle={{ fontWeight: "bold" }} icon={<i className="fa fa-times" style={{ color: '#fff' }}></i>} backgroundColor="rgb(255, 97, 85)" onTouchTap={this.handleToggle.bind(this)} disabled={isLoading} />

        ];
        return (<Dialog actions={actions} modal={true}
            open={this.state.open} onRequestClose={this.handleClose}>

            <div className="fieldsWrapper">
                <div style={{ textAlign: 'center' }}>
                    <img src={require("../images/logoColored.jpg")} style={{ width: '220px' }} />
                </div>
                <h3 style={{ textAlign: 'center' }}>Add Client Information</h3>
                <mat.Divider />
                <mat.TextField className="drawerInput" hintText="Custome Name" underlineShow={false} value={customer.name} id="name" onChange={(ev) => this.handleChange(ev.target.id, ev.target.value)} disabled={isLoading} onBlur={(ev) => this.inputTest(ev.target.id, "3")} />
                <mat.Divider />
                <mat.Divider />
                <MaskedInput className="drawerInput" mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]} placeholder="Custome CNIC" value={customer.CNIC} id="CNIC" onChange={(ev) => this.handleChange(ev.target.id, ev.target.value)} disabled={isLoading} style={{ borderBottom: '1px solid gray', height: '52px', textAlign: 'left' }} />
                {/* <mat.TextField hintText="Custome CNIC" underlineShow={false} value={customer.CNIC} onChange={this.handleChange.bind(this, "CNIC")} disabled={isLoading} /> */}
                <mat.Divider />
                <mat.TextField className="drawerInput" hintText="Residence Address" underlineShow={false} value={customer.residenceAddress} id="residenceAddress" onChange={(ev) => this.handleChange(ev.target.id, ev.target.value)} disabled={isLoading} />
                <mat.Divider />
                <mat.TextField className="drawerInput" hintText="Office/Work Address" underlineShow={false} value={customer.workAddress} id="workAddress" onChange={(ev) => this.handleChange(ev.target.id, ev.target.value)} disabled={isLoading} />
                <mat.Divider />
                {/* <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <mat.RaisedButton label="Add" labelColor='#808080' icon={iconLabel} style={{ color: 'gray' }} labelStyle={{ fontWeight: "bold" }} onTouchTap={this.sendInToDb.bind(this)} disabled={isLoading} />
                    <mat.RaisedButton label="Cancel" labelColor='#fff' labelStyle={{ fontWeight: "bold" }} icon={<i className="fa fa-times" style={{ color: '#fff' }}></i>} backgroundColor="rgb(255, 97, 85)" onTouchTap={this.handleToggle.bind(this)} disabled={isLoading} ></mat.RaisedButton>
                </div> */}
            </div>
        </Dialog>);
    }
}


export default AddClientDialog;