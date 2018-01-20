
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
/**
 * React select box
 */
import Select, { Creatable } from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { Button } from 'react-bootstrap';
import { Table, TableRow, TableHeader, TableHeaderColumn, TableRowColumn, Card, CardText, RaisedButton, Paper, CircularProgress, FloatingActionButton } from 'material-ui';
import { SelectField, MenuItem } from 'material-ui';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Style
import Style from '../styles/style';
import '../styles/css.css';

// Custome Components
import TableMaterialView, { TableBodyView } from '../components/tableMaterialUI'
import TableBootstrapView from '../components/tableBootstrap'
import ApplicantForm from '../components/forms/applicantForm'
import ImageUpload from '../components/imageUpload';
import ApplicantOfficeForm from '../components/forms/applicantOfficeForm'
import HeaderView from '../components/header';
import AddClientDrawer from '../components/addClientDrawer';
import AddClientDialog from '../components/addClientDialog';
import ShowPrintImage from './showPrintImages';
import EditForm from '../components/editForm';
import AddFormImage from '../components/addFormImage';

// Actions
import { AuthActions, UserActions, FileActions } from '../store/actions';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
];


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            filteredCustomers: [],
            descending: false,
            addClient: false,
            customer: {
                name: "",
                CNIC: "",
                residenceAddress: "",
                workAddress: "",
                officeStatus: "",
                residenceStatus: "",
                assets: ""
            },
            tempSelectedValue: null,
            value: null,
            customers: [],
            addForm: false,
            addFormType: null,
            editingUser: {},
            openImageDialog: false,
            images: false,
            imageUploadingFor: null,
            showEditUserFormDialog: false,
            formFlag: false

        }
    }

    componentWillMount() {
        const application = this.props;
        let { user } = application;
        if (Object.keys(user).length === 0) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user === null || user === undefined || Object.keys(user).length === 0) {
            application.history.push('/signin');
        } else if (application && user && Object.keys(user).length === 0) {
            application.history.push('/signin');
        } else if (application && user && Object.keys(user).length > 0 && user['type'] !== "primary") {
            application.history.goBack();
        } else {
            this.setState({ me: user })
            this.props.getCustomers();
        }
    }

    componentDidMount() {
        const application = this.props;
        let { user } = application;
        if (user === null || user === undefined || Object.keys(user).length === 0) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (!user) {
            application.history.push('/signin');
        } if (application && user && Object.keys(user).length === 0) {
            application.history.push('/signin');
        } else if (application && user && Object.keys(user).length > 0 && user['type'] !== "primary") {
            application.history.goBack();
        } else {
            this.sortItems("name");
        }
    }

    searching(ev) {
        const searchStr = ev.target.value.toLowerCase();
        const newState = Object.assign({}, this.state);
        const { customers } = newState;
        let temp = [];
        if (isNaN(searchStr)) {
            temp = customers.filter((item) => {
                const title = item.name.toLowerCase();
                return title.search(searchStr) !== -1
            })
        } else if (!isNaN(searchStr)) {
            temp = customers.filter((item) => {
                const title = item.CNIC.toLowerCase();
                return title.search(searchStr) !== -1
            })
        }
        this.setState({ filteredCustomers: temp });
    }

    sortItems(val, ev) {
        // var column = ev.target.cellIndex;
        this.setState({ descending: !this.state.descending });
        const newState = Object.assign({}, this.state);
        const { filteredCustomers } = newState;
        const temp = filteredCustomers.sort((a, b) => {
            return this.state.descending ?
                (a[val] < b[val] ? 1 : -1) :
                (a[val] > b[val] ? 1 : -1);
        });
        this.setState({ filteredCustomers: temp });
    }
    componentWillReceiveProps(newProps) {
        if (newProps.images.length > 0) {
            this.props.resetMessageAndStatus();
            setTimeout(() => {
                this.props.history.push(`/image/${this.state.editingUser['key']}?q=${this.state.imageUploadingFor}`);
            }, 1000);
        }

        if (newProps.customers && newProps.customers.length > 0 && newProps.customers.length != this.state.customers.length) {
            this.setState({ customers: newProps.customers, filteredCustomers: newProps.customers }, () => this.sortItems("name"));
        }

        if (this.state.formFlag === false && this.state.addForm === true && (Object.keys(this.state.editingUser).length > 0) && newProps.form && (Object.keys(newProps.form).length > 0) && newProps.message && newProps.code)
            this.props.history.push(`/form/${this.state.editingUser['key']}?q=${this.state.formType}`);

        if (Object.keys(newProps.user).length === 0 && newProps.isLoggedIn === false) {
            this.props.history.push('/signin');
        }
        //  else if (newProps.message != null && newProps.code !== null && newProps.form && Object.keys(newProps.form).length > 0) {
        //     this.props.history.push(profile);
        // }
    }

    handleSelectBox(name, ev, index, value) {
        this.setState({ [name]: value });
    }

    logoutRequest() {
        this.props.logoutRequest(this.state.me);
    }

    // This function runs when Add customer/client is pressed.  
    toggleAddClient() {
        let newState = this.state;
        if (this.state.addClient === true) {
            newState['customer']['name'] = "";
            newState['customer']['CNIC'] = "";
            newState['customer']['residenceAddress'] = "";
            newState['customer']['workAddress'] = "";
            newState['customer']['residenceStatus'] = "";
            newState['customer']['officeStatus'] = "";
            newState['customer']['salarySlip'] = "Pending";
        }
        newState['addClient'] = !this.state.addClient;
        this.setState(newState);
        this.props.resetMessageAndStatus();
    }

    addClientFields(name, value) {
        let newState = this.state;
        newState.customer[name] = value
        this.setState(newState)
    }

    sendInToDb(customer) {
        this.props.sendInToDb(customer);
    }

    ShowForm(index, type, formType, ev) {
        this.setState({ editingUser: this.state.filteredCustomers[index], formType: formType }, () => {
            this.toggleForm();
        })
    }

    toggleForm() {
        this.setState({ addForm: !this.state.addForm, addFormType: null });
    }

    addNewToselectBox(ev, a, b) {
        this.setState({ value: this.state.tempSelectedValue });
        const index = options.map((opt) => { return opt.value }).indexOf(this.state.tempSelectedValue);
        (index === -1) ? options.push({ value: this.state.tempSelectedValue, label: this.state.tempSelectedValue }) : null;
    }

    filterCustomersObj(filteredCustomers, showIndex) {
        const arrayToRender = filteredCustomers.map((obj, index) => {
            const disable = obj['assets'] === "" || !obj['assets'] || !obj['assetsUrl'] || obj['officeStatus'] === "" || !obj['officeStatus'] || !obj['officeUrl'] || !obj['officeUrl'] === "" || obj['residenceStatus'] === "" || !obj['residenceStatus'] || !obj['residenceUrl'];
            return {
                name: obj['name'],
                CNIC: obj['CNIC'],
                residenceAddress: obj['residenceAddress'],
                workAddress: obj['workAddress'],
                residenceStatus: (obj['residenceStatus'] === "" || !obj['residenceStatus']) ? "" : this.tableButton("fa fa-pencil", "fa fa-image", "residenceStatus", "Residence", index, obj['residenceUrl'], obj['residenceImageUrl'], obj['residenceStatus']),
                // residenceStatus: (obj['residenceStatus'] === "Pending") ? <div style={{ display: 'flex', justifyContent: 'space-between' }}><RaisedButton label={<i className="fa fa-pencil"></i>} onClick={this.ShowForm.bind(this, index, "residenceStatus", "Residence")} style={{ minWidth: '40px' }} /><RaisedButton label={<i className="fa fa-image"></i>} onClick={this.ShowForm.bind(this, index, "residenceStatus", "Residence")} style={{ minWidth: '40px', marginLeft: '8px' }} /></div> : <div><RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['residenceUrl']} target="_blank" download style={{ minWidth: '40px' }} /> <RaisedButton label={<i className="fa fa-pencil"></i>} onClick={this.ShowForm.bind(this, index, "residenceStatus", "Residence")} style={{ minWidth: '40px', marginLeft: '8px' }} /></div>,
                officeStatus: (obj['officeStatus'] === "" || !obj['officeStatus']) ? "" : this.tableButton("fa fa-pencil", "fa fa-image", "officeStatus", "Office", index, obj['officeUrl'], obj['officeImageUrl'], obj['officeStatus']),
                // officeStatus: (obj['officeStatus'] === "Pending") ? <RaisedButton label={<i className="fa fa-pencil"></i>} onClick={this.ShowForm.bind(this, index, "officeStatus", "Office")} style={{ minWidth: '40px' }} /> : <RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['officeUrl']} target="_blank" download style={{ minWidth: '40px' }} />,
                button: this.addAssetsBtn(obj['assets'], obj['assetsUrl'], index)
                // done: (obj['completed'] === true && obj['sent'] === true) ? <RaisedButton label={<i className="fa fa-paper-plane" style={{ color: '#008080' }}></i>} /> : <RaisedButton label={<i className="fa fa-check" ></i>} onClick={this.sendToDownload.bind(this, index)} disabled={disable} />
            }
        })
        return TableBodyView(arrayToRender, showIndex, true, this.state.me['type']);
    }

    tableButton(firstIcon, secondIcon, typeStatus, type, index, url, imageUrl, status) {
        return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {(status === "Pending") ? <RaisedButton label={<i className="fa fa-file-text"></i>} onClick={this.ShowForm.bind(this, index, typeStatus, type)} style={{ minWidth: '40px' }} /> :
                <RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={url} target="_blank" download style={{ minWidth: '40px' }} />}
            {(!imageUrl || imageUrl === "") ? <RaisedButton label={<i className={secondIcon}></i>} onClick={this.addImages.bind(this, type, typeStatus, index)} style={{ minWidth: '40px' }} /> :
                <RaisedButton label={<i className={secondIcon} style={{ color: '#008080' }}></i>} href={imageUrl} target="_blank" download style={{ minWidth: '40px' }} />}
        </div>
    }

    tableDownloadButton(firstIcon, secondIcon, url, imageUrl) {
        // <RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['residenceUrl']} target="_blank" download style={{ minWidth: '40px' }} /> <RaisedButton label={<i className="fa fa-pencil"></i>} onClick={this.ShowForm.bind(this, index, "residenceStatus", "Residence")} style={{ minWidth: '40px', marginLeft: '8px' }} />
        return <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RaisedButton label={<i className={firstIcon} style={{ color: '#008080' }}></i>} href={url} target="_blank" download style={{ minWidth: '40px' }} />
            <RaisedButton label={<i className={secondIcon} style={{ color: '#008080' }}></i>} href={imageUrl} target="_blank" download style={{ minWidth: '40px' }} />
        </div>
    }

    addImages(type, typeStatus, index) {
        const editingUser = this.state.filteredCustomers.slice(index, index + 1).pop();
        if (editingUser[typeStatus] == "" || editingUser[typeStatus] == "Pending") { toast.error("Please Fill Form first"); return; }
        this.setState({ editingUser, openImageDialog: !this.state.openImageDialog, imageUploadingFor: type })
    }

    addAssetsBtn(assets, assetsUrl, index) {
        return <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            {/* {(assets === "" || assets || assetsUrl) ? <RaisedButton label={<i className="fa fa-file-image-o"></i>} onClick={this.addImages.bind(this, index)} style={{ minWidth: '40px' }} /> :
                <RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={assetsUrl} target="_blank" download style={{ minWidth: '40px' }} />} */}
            <RaisedButton label={<i className="fa fa-pencil"></i>} onClick={this.editForm.bind(this, index)} style={{ minWidth: '40px' }} />
        </div>
    }

    addAssets(index) {
        this.setState({ openImageDialog: !this.state.openImageDialog })

    }

    sendToDownload(index) {
        const key = this.state.filteredCustomers[index]['key'];
        this.props.sendToDownload(key);
    }

    submitForm(formData) {
        this.setState({ formFlag: false });
        this.props.submitForm(formData, this.state.editingUser)
    }

    addTempImages(images) {
        this.props.addTempImages(images);
    }

    editForm(index) {
        this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog, editingUser: this.state.filteredCustomers[index] })
    }

    showEditingForm(name, type, typeStatus) {
        if (!name || name == null) this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog });
        else if (name === "Residence" || name === "Office") this.setState({ formType: name, showEditUserFormDialog: !this.state.showEditUserFormDialog, formFlag: true }, () => {
            this.props.getCustomerFormData(this.state.editingUser['key'], name, true);
            this.toggleForm();
        }); else {
            if (this.state.editingUser[typeStatus] == "" || this.state.editingUser[typeStatus] == "Pending" || !this.state.editingUser['residenceImageUrl']) {
                // setTimeout(() => {
                //     toast.error("Please Fill Form first");
                // }, 10)
                this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog })
            } else {
                this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog, openImageDialog: !this.state.openImageDialog, imageUploadingFor: type })
            }
        }
        // this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog, formFlag: false });
        // this.setState({ showEditUserFormDialog: !this.state.showEditUserFormDialog, editingUser: this.state.filteredCustomers[index] })
    }
    addFile(file, result) {
        let revision = (this.state.formType === "Residence") ? this.state.editingUser['residenceRevise'] : this.state.editingUser['officeRevise'];
        if (!revision || revision === null || revision === undefined) revision = 0;
        const obj = {
            userId: this.state.editingUser.key,
            url: (this.state.formType === "Residence") ? "residenceUrl" : "officeUrl",
            public_id: (this.state.formType === "Residence") ? this.state.editingUser.key + `-${revision}-residenceUrl` : this.state.editingUser.key + `-${revision}-officeUrl`,
            status: (this.state.formType === "Residence") ? "residenceStatus" : "officeStatus",
            verification: result,
            revision: revision + 1,
            revisionName: (this.state.formType == "Residence") ? 'residenceRevise' : 'officeRevise',
            type: this.state.formType
        }
        this.props.uploadFile(file, obj)

    }

    resetMessageAndStatus() {
        this.props.resetMessageAndStatus();
    }

    render() {
        let { filteredCustomers, descending } = this.state;
        const keys = ["name", "CNIC", "residenceAddress", "workAddress", "residenceAddressStatus", "workAddressStatus"]
        const tableHeader = ["Customer Name", "CNIC", "Residence Address", "Work Address", "Residence Address Status", "Work Address Status", ""]
        let arrow = (descending === false) ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
        const showIndex = true;
        let logoutLable;
        if (this.props.isLoading) logoutLable = <CircularProgress size={30} />
        else logoutLable = "logout";
        const obj = { inProcess: this.props.isLoading }
        return (
            <div>
                <Paper zDepth={1}>
                    <HeaderView label={logoutLable} logout={this.logoutRequest.bind(this)} user={this.props.user} />
                    {(this.state.addForm === false) ?
                        <div>
                            {(this.props.customers.length > 0) ?
                                <div>
                                    <Card>
                                        <CardText>
                                            <div className="searchBar">
                                                <div className="searchBox">
                                                    <input type="text" onChange={this.searching.bind(this)} placeholder="Search Name or CNIC" />
                                                </div>
                                            </div>
                                        </CardText>
                                    </Card>
                                    <Card id="abc" style={{ marginTop: '3px' }}>
                                        <CardText>
                                            <Table adjustForCheckbox={false} displayRowCheckbox={false}>
                                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                                    <TableRow className="assignmentTableRow">
                                                        <TableHeaderColumn style={{ width: '50px', textAlign: 'center' }}>S.NO</TableHeaderColumn>
                                                        {(tableHeader).map((headerValue, headerIndex) => <TableHeaderColumn key={headerIndex} onTouchTap={this.sortItems.bind(this, keys[headerIndex])} style={{ width: (headerIndex + 1 === tableHeader.length) ? '120px' : '' }}>{headerValue} {arrow}</TableHeaderColumn>)}
                                                        {/* <TableHeaderColumn style={{ width: '120px' }}></TableHeaderColumn> */}
                                                    </TableRow>
                                                </TableHeader>
                                                {this.filterCustomersObj(filteredCustomers, showIndex, true)}
                                            </Table>
                                        </CardText>
                                    </Card>
                                    {(this.state.openImageDialog === true) ? <ImageUpload open={this.state.openImageDialog} obj={obj} close={this.addAssets.bind(this)} addTempImages={this.addTempImages.bind(this)} /> : null}
                                </div> : null}
                            {(this.state.addClient === false) ?
                                <div className="addClientBtn">
                                    <FloatingActionButton onTouchTap={this.toggleAddClient.bind(this)}>
                                        <i className="fa fa-plus"></i>
                                    </FloatingActionButton>
                                </div> : null}
                        </div> :
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ margin: '20px' }}>
                                    <FloatingActionButton mini backgroundColor="white" iconStyle={{ color: 'gray' }} onClick={this.toggleForm.bind(this)}>
                                        <i className="fa fa-arrow-left"></i>
                                    </FloatingActionButton>
                                </div>
                                <div className="flexItems" >
                                    <SelectField
                                        ref="addFormType"
                                        name="addFormType"
                                        floatingLabelText="Want to add picture or Enter Form Value"
                                        value={this.state['addFormType']}
                                        onChange={this.handleSelectBox.bind(this, 'addFormType')}
                                        required={true} style={{ width: '350px' }}
                                        floatingLabelStyle={Style.floatingLabelStyle} underlineStyle={Style.underlineStyle} underlineFocusStyle={Style.underlineFocusStyle} floatingLabelFocusStyle={Style.floatingLabelFocusStyle}>
                                        {[{ label: "Enter Form Value", value: 1 }, { label: "Add Picture", value: 2 }].map((addFormType, index) => {
                                            return <MenuItem key={index} name="addFormType" value={addFormType.value} primaryText={addFormType.label} />
                                        })}
                                    </SelectField>
                                </div>
                                <div></div>
                            </div>
                            {
                                (this.state.formType === "Residence" && this.state.addFormType === 1) ? <ApplicantForm submitForm={this.submitForm.bind(this)} goBack={this.toggleForm.bind(this)} editingUser={this.state.editingUser} formData={this.props.form || {}} /> :
                                    (this.state.formType === "Office" && this.state.addFormType === 1) ? <ApplicantOfficeForm submitForm={this.submitForm.bind(this)} goBack={this.toggleForm.bind(this)} editingUser={this.state.editingUser} formData={this.props.form || {}} /> : null
                            }
                            {((this.state.formType === "Residence" || this.state.formType === "Office") && this.state.addFormType === 2) ? <AddFormImage open={this.state.addFormType === 2} addFile={this.addFile.bind(this)} close={this.toggleForm.bind(this)} isLoading={this.props.isLoading} message={this.props.message} code={this.props.code} resetMessage={this.resetMessageAndStatus.bind(this)} /> : null}

                        </div>}
                    {/* {(this.state.addClient === true) ? <AddClientDrawer open={this.state.addClient} application={this.state.customer} handleChange={this.addClientFields.bind(this)} close={this.toggleAddClient.bind(this)} sendInToDb={this.sendInToDb.bind(this)} isLoading={this.props.isLoading} message={this.props.message} code={this.props.code} /> : null} */}
                    {(this.state.addClient === true) ? <AddClientDialog open={this.state.addClient} application={this.state.customer} handleChange={this.addClientFields.bind(this)} close={this.toggleAddClient.bind(this)} sendInToDb={this.sendInToDb.bind(this)} isLoading={this.props.isLoading} message={this.props.message} code={this.props.code} /> : null}
                    {(this.state.showEditUserFormDialog === true) ? <EditForm open={this.state.showEditUserFormDialog} editingUser={this.state.editingUser} close={this.showEditingForm.bind(this)} /> : null}
                    <ToastContainer
                        style={{ zIndex: 999999 }}
                        position="top-center"
                        type="default"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                    />

                </Paper>
            </div>
        );
    }
}

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return (state.userReducer)
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logoutRequest: (user) => dispatch(AuthActions.logout(user)),
        sendInToDb: (obj) => dispatch(UserActions.addClientDetails(obj)),
        getCustomers: () => dispatch(UserActions.getCustomers()),
        resetMessageAndStatus: () => dispatch(UserActions.resetMessageAndStatus()),
        submitForm: (formData, editingUser) => dispatch(UserActions.submitForm(formData, editingUser)),
        addTempImages: (images) => dispatch(UserActions.temporaryAddImages(images)),
        sendToDownload: (key) => dispatch(UserActions.sendToDownload(key)),
        getCustomerFormData: (userId, formType, flag) => dispatch(UserActions.getCustomerFormData(userId, formType, flag)),
        uploadFile: (dataUrl, obj) => dispatch(FileActions.uploadFile(dataUrl, obj)),
        // resetForm: () => dispatch(FileActions.resetForm()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));