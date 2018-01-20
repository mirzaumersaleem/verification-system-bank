import React, { Component } from 'react';
// import ApplicantInformationForm from './applicantInformationForm'
/* import validator function to validate fields*/
import { validator, radioBtnValidator } from '../../utils/functions'

import './formStyles.css'

export default class ApplicantDetailsForm extends Component {

    render() {
        const { isSubmitting } = this.props;
        return (
            <div>
                <br />
                <div className="subHeading"><p>Applicant Details</p></div>
                <br />
                <div className="row">
                    {(this.props.type === "Residence") ?
                        <div>
                            <div className="col-sm-8">

                                <div className="form-group">
                                    <label className="col-sm-5 col-md-4 col-lg-3" htmlFor="applicantName">Name of Applicant:</label>
                                    <div className="col-sm-7 col-md-8 col-lg-9">
                                        <input type="text"
                                            className={validator(this.props.values['applicantName'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="applicantName" name="applicantName" placeholder="Name of Applicant"
                                            value={this.props.values['applicantName']} onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="visitTime">Visit Time:</label>
                                    <div className="col-sm-7 col-md-8 col-lg-8">
                                        <input type="time"
                                            className={validator(this.props.values['visitTime'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="visitTime" name="visitTime" placeholder="Visit Time" value={this.props.values['visitTime']} onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>
                            </div></div> :
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label className="col-sm-4 col-md-3 col-lg-2" htmlFor="applicantName">Name of Applicant:</label>
                                <div className="col-sm-8 col-md-9 col-lg-10">
                                    <input type="text"
                                        className={validator(this.props.values['applicantName'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="applicantName" name="applicantName" placeholder="Name of Applicant" value={this.props.values['applicantName']}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        </div>}
                </div>


                {(this.props.type !== "Residence") ?
                    <div>
                        <div className="row">
                            <div className="col-sm-12">

                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 col-lg-2" htmlFor="officeName">Company Name:</label>
                                    <div className="col-sm-9 col-md-10 col-lg-10">
                                        <input type="text"
                                            className={validator(this.props.values['officeName'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="officeName" name="officeName" value={this.props.values['officeName']}
                                            placeholder="Company Name" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">

                                <div className="form-group">
                                    <label className="col-sm-3 col-md-2 col-lg-2" htmlFor="officeAddress">Office Address:</label>
                                    <div className="col-sm-9 col-md-10 col-lg-10">
                                        <input type="text"
                                            className={validator(this.props.values['officeAddress'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="officeAddress" name="officeAddress" placeholder="Office Address" value={this.props.values['officeAddress']}
                                            onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="row">
                        <div className="col-sm-12">

                            <div className="form-group">
                                <label className="col-sm-3 col-md-2 col-lg-2" htmlFor="residenceAddress">Residence address:</label>
                                <div className="col-sm-9 col-md-10 col-lg-10">
                                    <input type="text"
                                        className={validator(this.props.values['residenceAddress'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="residenceAddress" name="residenceAddress" placeholder="Residence address" value={this.props.values['residenceAddress']}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>


                        </div>
                    </div>}
                {/* <ApplicantInformationForm /> */}
            </div>
        )

    }
}
