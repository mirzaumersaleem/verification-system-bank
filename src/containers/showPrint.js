import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import domtoimage from 'dom-to-image';

// Material UI import
import { RaisedButton, FloatingActionButton } from 'material-ui';

// Actions
import { UserActions, FileActions } from '../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import $ from 'jquery'
// Style
import '../styles/css.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { form: {}, imag: null, flag: false };
        this.paramKey = this.props.location.pathname.split('/').pop();
        this.query = this.props.location.search.split('=').pop();
        this.props.getCustomerFormData(this.paramKey, this.query);
        this.printForm = this.printForm.bind(this);
    }

    componentWillMount() {
        if (!this.props.user || Object.keys(this.props.user).length === 0 || !this.props.form || Object.keys(this.props.form).length === 0) {
            this.props.history.push('/admin')
        }
    }

    componentWillReceiveProps(newProps) {
        (Object.keys(newProps.form).length > 0) ? this.setState({ form: newProps.form }) : null
        if (this.state.flag === true && Object.keys(newProps.form).length > 0 && newProps.message && newProps.code === 200) {
            this.props.resetForm();
            this.props.history.push('/admin');
        }
    }

    printForm() {
        let self = this;
        domtoimage.toPng(document.getElementById('rootValue'))
            .then(function (dataUrl) {
                const revision = (self.state.form['type'] === "Residence") ? self.props.form['residenceRevise'] : self.props.form['officeRevise'];
                const obj = {
                    userId: self.paramKey,
                    url: (self.state.form['type'] === "Residence") ? "residenceUrl" : "officeUrl",
                    public_id: (self.state.form['type'] === "Residence") ? self.paramKey + `-${revision}-residenceUrl` : self.paramKey + `-${revision}-officeUrl`,
                    status: (self.state.form['type'] === "Residence") ? "residenceStatus" : "officeStatus",
                    verification: self.state.form['verification'],
                    revision: revision + 1,
                    revisionName: (self.state.form['type'] == "Residence") ? 'residenceRevise' : 'officeRevise',
                    type: self.state.form['type']
                }
                self.props.uploadFile(dataUrl, obj);
                self.setState({ imag: dataUrl, flag: true })
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
                toast.error("Oops, Please try again.");
            });
    }
    toggleForm() {
        this.props.history.push('/admin');
    }
    render() {
        return (
            <div>
                <div style={{ position: 'fixed', top: '24px', left: '30px' }}>
                    <FloatingActionButton mini backgroundColor="white" iconStyle={{ color: 'gray' }} onClick={this.toggleForm.bind(this)} disabled={this.state.flag}>
                        <i className="fa fa-arrow-left"></i>
                    </FloatingActionButton>
                </div>
                {((this.state.form['type']) === "Residence") ?
                    <div className="printFontSize" id="rootValue" >
                        <div style={{ width: '680px', border: '1px solid gray', marginLeft: 'auto', marginRight: 'auto', padding: '20px', background: '#ffffff' }}>
                            <div className="row">
                                <div className="col-sm-2 col-md-2 col-lg-2">
                                    <img src={require('../images/logo.jpg')} style={{ float: 'left', marginTop: '-12px' }} />
                                </div>
                                <div style={{ textAlign: "center" }} className="col-sm-8 col-md-8 col-lg-8">
                                    <h3 className="printHeading">DATA COLLECION SERVICES</h3>
                                    <h6 className="printHeading">E-mail: karachi@dcspakistan.com</h6>
                                    <h4 className="printHeading">EV FORM - APPLICANT</h4>
                                    <h5 className="printHeading">({this.state.form['type']})</h5>
                                    {/* <h5 className="printHeading">(Residence)</h5> */}
                                </div>
                            </div>
                            {/* Top section starts */}
                            <div className="printFontSize">
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="noOfVisits">No. of Visits:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.noOfVisits} </span>
                                            {/* <p className="displayView">25</p> */}
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="branch">Branch: </label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.branch} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="givenDate">VA Given Date:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.givenDate}  </span>
                                        </div>

                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-6">

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="applicationNo">Application No.:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicationNo} </span>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="dileveryDate">Va Delivery Date:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.dileveryDate} </span>
                                        </div>

                                    </div>

                                    <div className="col-sm-6 col-md-6 col-lg-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="product">Product:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.product} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Top section ends */}
                            {/* Residence Details section starts */}

                            <div>
                                <div className="printSubHeading"><p>Applicant Details</p></div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="applicantName">Name of Applicant:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantName} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="visitTime">Visit Time:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.visitTime} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residenceAddress">Company Name:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residenceAddress} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residenceAddress">Office Address:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residenceAddress} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Residence Details section ends */}
                            {/* Residence information section starts */}
                            <div>
                                <div className="printSubHeading"><p>Applicant Information</p></div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="givenAddress">Given address is:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.givenAddress} </span>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="nameOfPersonMet">Name of the person met:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMet} </span>
                                        </div>


                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="metAppicant">Met the applicant:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.metAppicant} </span>

                                        </div>


                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="applicantRelationShip">Relationship with the applicant:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantRelationShip} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="resideHere">Applicant resides here:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.resideHere} </span>
                                        </div>

                                    </div>
                                    <div className="col-sm-6">

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="fatherOrhusbandName">Father/husband name:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.fatherOrhusbandName} </span>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residingSince">Residing since:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residingSince} </span>
                                        </div>

                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="telephone">Telephone:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.telephone} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="applicantCNIC">Applicant CNIC #</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantCNIC} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="mobile">Mobile #</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.mobile} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="metPersonCNIC">Met (Person/Lady) CNIC #</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.metPersonCNIC} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label htmlFor="residenceIs">Residence is:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residenceIs} </span>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="rentAmount"> Rent Amount</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.rentAmount} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="clientOfBank">Existing client of Bank:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.clientOfBank} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="vehicleOwned" className="labelTextSmall">Any other vehicle owned:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.vehicleOwned} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="form-group form-group-margin">
                                            <div className="col-sm-5 padding-left-right">
                                                <label htmlFor="make" className="labelTextSmall">Make:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.make} </span>
                                            </div>
                                            <div className="col-sm-4 padding-left-right">
                                                <label htmlFor="model" className="labelTextSmall">Model:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.model} </span>
                                            </div>
                                            <div className="col-sm-3 padding-left-right">
                                                <label htmlFor="reg" className="labelTextSmall">Reg#</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.reg} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="fiancialFacility">Availing any finacial facility:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.fiancialFacility} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="institution">If yes, Institution name:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.institution} </span>
                                    </div>
                                </div>
                            </div>
                            {/* Residence information section ends */}
                            {/* Residence Profile section starts */}
                            <div>
                                <div className="printSubHeading"><p>Residence Profile</p></div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residenceType">Residence Type:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residenceType} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="Nameplate">Nameplate or signboard affixed:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.Nameplate} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="underNameOf">Under the name of:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.underNameOf} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4 col-md-3 col-lg-3">
                                        <label htmlFor="resideHere"> Residence Color:</label>
                                    </div>
                                    <div className="col-sm-8 col-md-9 col-lg-9">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="buildingColor"> Building </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.buildingColor} </span>

                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="gateColor"> Gate: </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.gateColor} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="localProperNumbering"> Locality has proper numbering:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.localProperNumbering} </span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="coveredArea">Approx. Covered Area:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.coveredArea} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="politicallyAffiliatedArea">Politically affiliated area:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.politicallyAffiliatedArea} </span>
                                        </div>

                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="nearestLandMark">Nearest land Mark:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nearestLandMark} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="infrastructureOfArea">Infrastructure quality of area:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.infrastructureOfArea} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Residence Profile section ends */}
                            {/* Neighbour Confirmation section starts */}
                            <div className="row">
                                {/* Neighbour one Confirmation section starts */}
                                <div className="col-md-6 col-sm-6 col-lg-6" >
                                    <div className="printSubHeading"><p>Neighbour Confirmation-1</p></div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="nameOfPersonMetNB">Name of the person met:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMetNB} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="addressNB">Address:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.addressNB} </span>
                                    </div>

                                    <div className="form-group form-group-margin">
                                        <label htmlFor="knowTheApplcantNB" className="labelTextSmall">Does the neighbour know the applicant: </label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.knowTheApplcantNB} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="residencSinceNB" className="labelTextSmall">Applicant residing since:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencSinceNB} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="residencIsNB">Applicant residence is: </label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencIsNB} </span>
                                    </div>
                                </div>
                                {/* Neighbour one Confirmation section ends */}
                                {/* Neighbour two Confirmation section starts */}
                                <div className="col-md-6 col-sm-6 col-lg-6" >
                                    <div className="printSubHeading"><p>Neighbour Confirmation-2</p></div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="nameOfPersonMetNB2">Name of the person met:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMetNB2} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="addressNB2">Address:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.addressNB2} </span>
                                    </div>

                                    <div className="form-group form-group-margin">
                                        <label htmlFor="knowTheApplcantNB2" className="labelTextSmall">Does the neighbour know the applicant: </label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.knowTheApplcantNB2} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="residencSinceNB2">Applicant residing since:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencSinceNB2} </span>
                                    </div>
                                    <div className="form-group form-group-margin">
                                        <label htmlFor="residencIsNB2">Applicant residence is: </label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencIsNB2} </span>
                                    </div>
                                </div>
                                {/* Neighbour two Confirmation section ends */}
                            </div>
                            {/* Neighbour Confirmation section ends */}
                            {/* Comments section starts */}
                            <div>
                                {/* <br /> */}
                                <div className="form-group form-group-margin" style={{ height: '100px' }}>
                                    <label htmlFor="comment">EAMU Comments:</label>
                                    <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.comment} </span>
                                    {/* <textarea className="form-control commentBox notes" rows="5" id="comment" onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.id, ev.target.value)} ></textarea> */}
                                </div>
                                <div className="row">
                                    <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                        <div className="form-group">
                                            <label htmlFor="verification">Result of verfication:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> <b className="resultOfVarification">{this.state.form.verification} </b></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="signaturebox row">
                                    <div className="singleSign col-sm-4" >VA Signature.</div>
                                    <div className="col-sm-4" className="visitData">
                                        <span style={{ marginLeft: '10px' }}> {this.state.form.dateOfVisit} </span><br />
                                        <label htmlFor="dateOfVisit" className="singleSign">Date of Visit.</label>
                                    </div>
                                    <div className="singleSign col-sm-4">Checked By</div>
                                </div>
                            </div>

                        </div>
                    </div> : ((this.state.form['type']) === "Office") ?
                        <div className="printFontSize" id="rootValue" >
                            <div style={{ width: '680px', border: '1px solid gray', marginLeft: 'auto', marginRight: 'auto', padding: '20px', background: '#ffffff' }}>
                                <div className="row">
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        <img src={require('../images/logo.jpg')} style={{ float: 'left', marginTop: '-12px' }} />
                                    </div>
                                    <div style={{ textAlign: "center" }} className="col-sm-8 col-md-8 col-lg-8">
                                        <h3 className="printHeading">DATA COLLECION SERVICES</h3>
                                        <h6 className="printHeading">E-mail: karachi@dcspakistan.com</h6>
                                        <h4 className="printHeading">EV FORM - APPLICANT</h4>
                                        <h5 className="printLastHeading" >({this.state.form['type']})</h5>
                                        {/* <h2>({this.props.type})</h2> */}
                                    </div>
                                </div>
                                {/* Top section starts */}
                                <div className="printFontSize">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="noOfVisits">Visit Time:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.visitTime} </span>
                                                {/* <p className="displayView">25</p> */}
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="branch">Branch: </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.branch} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="givenDate">VA Given Date:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.givenDate}  </span>
                                            </div>

                                        </div>
                                        <div className="col-sm-6 col-md-6 col-lg-6">

                                            <div className="form-group form-group-margin">
                                                <label htmlFor="applicationNo">Application No.:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicationNo} </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="dileveryDate">Va Delivery Date:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.dileveryDate} </span>
                                            </div>

                                        </div>

                                        <div className="col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="product">Product:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.product} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Top section ends */}
                                {/* Residence Details section starts */}

                                <div>
                                    <div className="printSubHeading"><p>Applicant Details</p></div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="applicantName">Name of Applicant:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantName} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="residenceAddress">Company Name:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residenceAddress} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="officeAddress">Office Address:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.officeAddress} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Residence Details section ends */}
                                {/* Residence information section starts */}
                                <div>
                                    <div className="printSubHeading"><p>Applicant Information</p></div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="givenAddress">Given address is:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.givenAddress} </span>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">

                                            <div className="form-group form-group-margin">
                                                <label htmlFor="nameOfPersonMet">Name of the person met:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMet} </span>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group form-group-margin">
                                                <label htmlFor="metAppicant">Met the applicant:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.metAppicant} </span>

                                            </div>


                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="designationMetPerson">Designation of Met Person : </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.designationMetPerson} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="workGivenAddress">Applicant works at given address : </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.workGivenAddress} </span>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">

                                            <div className="form-group form-group-margin">
                                                <label htmlFor="designationOfApplicant">Designation of the applicant : </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.designationOfApplicant} </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group form-group-margin">
                                                <label htmlFor="applicantCNIC">Applicant CNIC # : </label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantCNIC} </span>
                                            </div>

                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="telephone">Telephone:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.telephone} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="businessmanNTN">If businessman NTN #</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.businessmanNTN} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="mobile">Mobile #</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.mobile} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="yearInBusiness">Year in businessman/employement:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.yearInBusiness} </span>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="howLongAtGivenAddress">How long at given address:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.howLongAtGivenAddress} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group form-group-margin">
                                            <div className="col-sm-8">
                                                <label htmlFor="OfficePremisesStatus">Office premises status:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.OfficePremisesStatus} </span>
                                            </div>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <div className="col-sm-4">
                                                <label htmlFor="rentAmount">Rent Amount</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.rentAmount} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="applicantStatus">Status of the applicant:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.applicantStatus} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="clientOfBank" className="labelTextSmall">Existing client of Bank:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.clientOfBank} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="Ifsalaried" className="labelTextSmall">Existing client of Bank:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.Ifsalaried} </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="vehicleOwned" className="labelTextSmall">Any other vehicle owned:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.vehicleOwned} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="form-group form-group-margin">
                                                <div className="col-sm-5 padding-left-right">
                                                    <label htmlFor="make" className="labelTextSmall">Make:</label>
                                                    <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.make} </span>
                                                </div>
                                                <div className="col-sm-4 padding-left-right">
                                                    <label htmlFor="model" className="labelTextSmall">Model:</label>
                                                    <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.model} </span>
                                                </div>
                                                <div className="col-sm-3 padding-left-right">
                                                    <label htmlFor="reg" className="labelTextSmall">Reg#</label>
                                                    <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.reg} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="fiancialFacility">Availing any finacial facility:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.fiancialFacility} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <label htmlFor="institution">If yes, Institution name:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.institution} </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Residence information section ends */}
                                {/* Residence Profile section starts */}
                                <div>
                                    <div className="printSubHeading"><p>Office Profile</p></div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="officeType">Office Type:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.officeType} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="Nameplate">Nameplate or signboard affixed:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.Nameplate} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="underNameOf">Under the name of:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.underNameOf} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="employerStatus">Business/Employer Status:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.employerStatus} </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="businessNature">Nature Of Business:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.businessNature} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="coveredArea">Approx. Covered Area:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.coveredArea} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="officeSetup">Office Setup:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.officeSetup} </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="unusualexplain">If unusual , Please explain:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.unusualexplain} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="politicallyAffiliatedArea">Politically affiliated area:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.politicallyAffiliatedArea} </span>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="nearestLandMark">Nearest land Mark:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nearestLandMark} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group form-group-margin">
                                                <label htmlFor="infrastructureOfArea">Infrastructure quality of area:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.infrastructureOfArea} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Residence Profile section ends */}
                                {/* Neighbour Confirmation section starts */}
                                <div className="row">
                                    {/* Neighbour one Confirmation section starts */}
                                    <div className="col-md-6 col-sm-6 col-lg-6" >
                                        <div className="printSubHeading"><p>Neighbour Confirmation-1</p></div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="nameOfPersonMetNB">Name of the person met:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMetNB} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="addressNB">Address:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.addressNB} </span>
                                        </div>

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="knowTheApplcantNB" className="labelTextSmall">Does the neighbour know the applicant: </label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.knowTheApplcantNB} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residencSinceNB" className="labelTextSmall">Applicant residing since:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencSinceNB} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residencIsNB">Applicant residence is: </label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencIsNB} </span>
                                        </div>
                                    </div>
                                    {/* Neighbour one Confirmation section ends */}
                                    {/* Neighbour two Confirmation section starts */}
                                    <div className="col-md-6 col-sm-6 col-lg-6" >
                                        <div className="printSubHeading"><p>Neighbour Confirmation-2</p></div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="nameOfPersonMetNB2">Name of the person met:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.nameOfPersonMetNB2} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="addressNB2">Address:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.addressNB2} </span>
                                        </div>

                                        <div className="form-group form-group-margin">
                                            <label htmlFor="knowTheApplcantNB2" className="labelTextSmall">Does the neighbour know the applicant: </label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.knowTheApplcantNB2} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residencSinceNB2">Applicant residing since:</label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencSinceNB2} </span>
                                        </div>
                                        <div className="form-group form-group-margin">
                                            <label htmlFor="residencIsNB2">Applicant residence is: </label>
                                            <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.residencIsNB2} </span>
                                        </div>
                                    </div>
                                    {/* Neighbour two Confirmation section ends */}
                                </div>
                                {/* Neighbour Confirmation section ends */}
                                {/* Comments section starts */}
                                <div>
                                    {/* <br /> */}
                                    <div className="form-group form-group-margin" style={{ height: '100px' }}>
                                        <label htmlFor="comment">EAMU Comments:</label>
                                        <span className="displayView" style={{ marginLeft: '10px' }}> {this.state.form.comment} </span>
                                        {/* <textarea className="form-control commentBox notes" rows="5" id="comment" onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.id, ev.target.value)} ></textarea> */}
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12" style={{ textAlign: 'center' }}>
                                            <div className="form-group">
                                                <label htmlFor="verification">Result of verfication:</label>
                                                <span className="displayView" style={{ marginLeft: '10px' }}> <b className="resultOfVarification">{this.state.form.verification} </b></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="signaturebox row">
                                        <div className="singleSign col-sm-4" >VA Signature.</div>
                                        <div className="col-sm-4" className="visitData">
                                            <span style={{ marginLeft: '10px' }}> {this.state.form.dateOfVisit} </span><br />
                                            <label htmlFor="dateOfVisit" className="singleSign">Date of Visit.</label>
                                        </div>
                                        <div className="singleSign col-sm-4">Checked By</div>
                                    </div>
                                </div>

                            </div>
                        </div> : null}
                <div style={{ textAlign: 'center' }}>
                    <RaisedButton label="Back" icon={<i className="fa fa-arrow-left"></i>} onTouchTap={this.toggleForm.bind(this)} disabled={this.state.flag} />
                    <RaisedButton label="Print" icon={<i className="fa fa-print"></i>} onTouchTap={this.printForm.bind(this)} disabled={this.state.flag} />
                </div>
                <ToastContainer
                    style={{ zIndex: 999999 }}
                    position="top-center"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                />
            </div>
        );
    }
}
// export default Profile;

// Get apps state and pass it as props to UserList
const mapStateToProps = (state, ownProps) => {
    return (state.userReducer)
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCustomerFormData: (key, type) => dispatch(UserActions.getCustomerFormData(key, type)),
        uploadFile: (dataUrl, obj) => dispatch(FileActions.uploadFile(dataUrl, obj)),
        resetForm: () => dispatch(FileActions.resetForm()),
        // updateUserInfo: (user) => {
        //     dispatch(AuthActions.updateUser(user))
        // }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));