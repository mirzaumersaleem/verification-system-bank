
import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table, TableRow, TableHeader, TableHeaderColumn, CircularProgress, TableRowColumn, Card, CardText, RaisedButton, Paper } from 'material-ui';
import HeaderView from '../components/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../styles/css.css';

// Custome Components
import TableBootstrapView from '../components/tableBootstrap'
import TableMaterialView, { TableBodyView } from '../components/tableMaterialUI'
import ApplicantForm from '../components/forms/applicantForm'

// Actions
import { AuthActions, UserActions, FileActions } from '../store/actions';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            descending: false,
            filteredCustomers: [],
            customers: [],
            me: {}
        }
    }

    componentWillMount() {
        const application = this.props;
        let { user } = application;
        if (Object.keys(user).length === 0) {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user === null || user === undefined || Object.keys(user).length === 0) {
            application.history.push('/signin'); return;
        } else if (application && user && Object.keys(user).length === 0) {
            application.history.push('/signin'); return;
        } else if (application && user && Object.keys(user).length > 0 && user['type'] !== "secondary") {
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
            application.history.push('/signin'); return;
        } if (application && user && Object.keys(user).length === 0) {
            application.history.push('/signin'); return;
        } else if (application && user && Object.keys(user).length > 0 && user['type'] !== "secondary") {
            application.history.goBack();
        } else {
            this.sortItems("name");
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.customers && newProps.customers.length > 0 && newProps.customers.length > this.state.customers.length) {
            this.setState({ customers: newProps.customers, filteredCustomers: newProps.customers }, () => this.sortItems("name"));
        }
        if (Object.keys(newProps.user).length === 0 && newProps.isLoggedIn === false) {
            this.props.history.push('/signin');
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

    filterCustomersObj(filteredCustomers, showIndex) {
        const arrayToRender = filteredCustomers.map((obj, index) => {
            const disable = obj['assets'] === "" || !obj['assets'] || !obj['assetsUrl'] || obj['officeStatus'] === "" || !obj['officeStatus'] || !obj['officeUrl'] || !obj['officeUrl'] === "" || obj['residenceStatus'] === "" || !obj['residenceStatus'] || !obj['residenceUrl'];
            return {
                name: obj['name'],
                CNIC: obj['CNIC'],
                residenceAddress: obj['residenceAddress'],
                workAddress: obj['workAddress'],
                residenceStatus: (obj['residenceStatus'] === "" || !obj['residenceStatus']) ? "" : (obj['residenceStatus'] === "Pending") ? "Pending" : this.tableButton(obj['residenceStatus'], obj['residenceUrl'], obj['residenceImageUrl']), //<RaisedButton label={obj['residenceStatus']} labelStyle={{ fontWeight: 'bold' }} labelColor={(obj['residenceStatus'] === "positive") ? '#008000' : '#FF0000'} icon={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['residenceUrl']} target="_blank" download />,
                officeStatus: (obj['officeStatus'] === "" || !obj['officeStatus']) ? "" : (obj['officeStatus'] === "Pending") ? "Pending" : this.tableButton(obj['officeStatus'], obj['officeUrl'], obj['officeImageUrl']),//<RaisedButton label={obj['officeStatus']} labelStyle={{ fontWeight: 'bold' }} labelColor={(obj['officeStatus'] === "positive") ? '#008000' : '#FF0000'} icon={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['officeUrl']} target="_blank" download />,
                // button: (obj['assets'] === "" || !obj['assets'] || !obj['assetsUrl']) ? "Pending" : <RaisedButton label={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={obj['assetsUrl']} target="_blank" download />,
            }
        })
        return TableBodyView(arrayToRender, showIndex, true, this.state.me['type']);
    }
    // tableButton(obj['residenceStatus'],  url, imageUrl)
    tableButton(typeStatus, url, imageUrl) {
        return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <RaisedButton label={typeStatus} labelColor={(typeStatus === "positive") ? '#008000' : '#FF0000'} icon={<i className="fa fa-download" style={{ color: '#008080' }}></i>} href={url} target="_blank" download />
            {(!imageUrl || imageUrl == "") ? <RaisedButton label={<i className="fa fa-image" style={{ color: '#C0C0C0' }}></i>} onClick={this.showToast.bind(this)} style={{ minWidth: '40px' }} /> :
                <RaisedButton label={<i className="fa fa-image" style={{ color: '#008080' }}></i>} href={imageUrl} target="_blank" download style={{ minWidth: '40px' }} />}
        </div>
    }

    showToast() {
        toast.error("Sorry! Image yet not uploaded!");
    }
    logoutRequest() {
        this.props.logoutRequest(this.state.me);
    }

    render() {
        let { filteredCustomers, descending } = this.state;
        const keys = ["name", "CNIC", "residenceAddress", "workAddress", "residenceAddressStatus", "workAddressStatus"]
        const tableHeader = ["Customer Name", "CNIC", "Residence Address", "Work Address", "Residence Address Status", "Work Address Status"]
        let arrow = (descending === false) ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
        const showIndex = true;
        let logoutLable;
        if (this.props.isLoading) logoutLable = <CircularProgress size={30} />
        else logoutLable = "logout";
        const obj = { inProcess: this.props.isLoading }
        return (
            <Paper zDepth={1}>
                <HeaderView label={logoutLable} logout={this.logoutRequest.bind(this)} user={this.props.user} />
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
                                    {(tableHeader).map((headerValue, headerIndex) => <TableHeaderColumn key={headerIndex} onTouchTap={this.sortItems.bind(this, keys[headerIndex])} style={{ textAlign: 'center' }}>{headerValue} {arrow}</TableHeaderColumn>)}
                                </TableRow>
                            </TableHeader>
                            {this.filterCustomersObj(filteredCustomers, showIndex, true)}
                        </Table>
                    </CardText>
                </Card>
                <ToastContainer
                    style={{ zIndex: 999999 }}
                    position="top-center"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </Paper>
            // <Paper zDepth={1}>
            //     <Card>
            //         <CardText>
            //             <div className="searchBar">
            //                 <div className="searchBox">
            //                     <input type="text" onChange={this.searching.bind(this)} placeholder="Search Name or CNIC" />
            //                 </div>
            //             </div>
            //         </CardText>
            //     </Card>
            //     <Card id="abc">
            //         <CardText>
            //             <Table adjustForCheckbox={false} displayRowCheckbox={false}>
            //                 <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            //                     <TableRow className="assignmentTableRow">
            //                         <TableHeaderColumn style={{ width: '50px', textAlign: 'center' }}>S.NO</TableHeaderColumn>
            //                         {(tableHeader).map((headerValue, headerIndex) => <TableHeaderColumn key={headerIndex} onTouchTap={this.sortItems.bind(this, keys[headerIndex])} style={{ textAlign: 'center' }}>{headerValue} {arrow}</TableHeaderColumn>)}
            //                     </TableRow>
            //                 </TableHeader>
            //                 {TableBodyView(filteredUsers, showIndex, true)}
            //             </Table>
            //         </CardText>
            //     </Card>
            //     <Button onTouchTap={this.generatePDF.bind(this)} />
            //     <ApplicantForm id="appl" />
            //     <div id="aaa"></div>
            // </Paper>
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
        getCustomers: (obj) => dispatch(UserActions.getCustomers()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));