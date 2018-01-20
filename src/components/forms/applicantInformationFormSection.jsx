import React, { Component } from 'react';
import MaskedInput from 'react-text-mask'
/** React select box */
import Select, { Creatable } from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
/* Material UI */
import { RaisedButton } from 'material-ui';
/* import validator function to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'
import './formStyles.css'

export default class ApplicantInformationForm extends Component {

    render() {
        const { isSubmitting } = this.props;
        return (
            <div>
                <br />
                <div className="subHeading"><p>Applicant Information</p></div>
                <br />
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['metAppicant'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="givenAddress">Given address is:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="givenAddress" id="givenAddress" value="correct" checked={this.props.values.givenAddress === "correct"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Correct</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="givenAddress" id="givenAddress" value="incorrect" checked={this.props.values.givenAddress === "incorrect"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />InCorrect</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-6 col-md-5 col-lg-4" htmlFor="nameOfPersonMet">Name of the person met:</label>
                            <div className="col-sm-6 col-md-7 col-lg-8">
                                <input type="text" className={validator(this.props.values['nameOfPersonMet'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="nameOfPersonMet" value={this.props.values['nameOfPersonMet']} name="nameOfPersonMet"
                                    placeholder="Name of the person met"
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['metAppicant'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="metAppicant">Met the applicant:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="metAppicant" id="metAppicant" value="yes" checked={this.props.values.metAppicant === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Yes</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="metAppicant" id="metAppicant" value="no" checked={this.props.values.metAppicant === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />No</label>
                            </div>
                        </div>


                    </div>
                    {(this.props.type === "Residence") ?

                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className={selectBoxValidator(this.props.values['applicantRelationShip'], isSubmitting) ? "col-sm-7 col-md-7 col-lg-5 displaySelectBoxError" : "col-sm-7 col-md-7 col-lg-5"} htmlFor="applicantRelationShip">Relationship with the applicant:</label>
                                <div className="col-sm-5 col-md-5 col-lg-7">
                                    {/* <input type="text" className="form-control displayView" name="applicantRelationShip" value={this.props.values['applicantRelationShip']} id="applicantRelationShip" placeholder="Relationship with the applicant" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                                    <Select
                                        id="applicantRelationShip"
                                        name="applicantRelationShip"

                                        value={this.props.values.applicantRelationShip}
                                        options={this.props.constants.relationships}
                                        onChange={(ev) => this.props.selectBoxChangeHandler("applicantRelationShip", ev)}
                                        closeOnSelect={true}
                                        Creatable={true}
                                        allowCreate={true}
                                        noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("applicantRelationShip", "relationships")} /></div>}
                                        onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                    />
                                </div>
                            </div>

                        </div> :

                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-7 col-md-7 col-lg-5" htmlFor="designationMetPerson">Designation of Met Person:</label>
                                <div className="col-sm-5 col-md-5 col-lg-7">
                                    <input type="text" className={validator(this.props.values['designationMetPerson'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        name="designationMetPerson" value={this.props.values['designationMetPerson']} id="designationMetPerson"
                                        placeholder="Designation of Met Person"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>

                        </div>}

                </div>
                {/* // start third line..... */}
                {(this.props.type === "Residence") ?
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="form-group">

                                <label className={radioBtnValidator(this.props.values['residenceType'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="resideHere">Applicant resides here:</label>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <label className="radio-inline"><input type="radio" name="resideHere" id="resideHere" value="yes" checked={this.props.values.resideHere === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Yes</label>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <label className="radio-inline"><input type="radio" name="resideHere" id="resideHere" value="no" checked={this.props.values.resideHere === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />No</label>
                                </div>

                            </div>

                        </div>


                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="fatherOrhusbandName">Father/husband name:</label>
                                <div className="col-sm-7 col-md-8 col-lg-8">
                                    <input type="text" className={validator(this.props.values['fatherOrhusbandName'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="fatherOrhusbandName" value={this.props.values['fatherOrhusbandName']} name="fatherOrhusbandName"
                                        placeholder="Father/husband name" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div> :
                    // if type is office
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="form-group">

                                <label className={radioBtnValidator(this.props.values['workGivenAddress'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="workGivenAddress">Applicant works at given address:</label>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <label className="radio-inline"><input type="radio" name="workGivenAddress" id="workGivenAddress" value="yes" checked={this.props.values.workGivenAddress === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Yes</label>
                                </div>
                                <div className="col-sm-3 col-md-3 col-lg-3">
                                    <label className="radio-inline"><input type="radio" name="workGivenAddress" id="workGivenAddress" value="no" checked={this.props.values.workGivenAddress === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />No</label>
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="designationOfApplicant">Designation of the applicant:</label>
                                <div className="col-sm-7 col-md-8 col-lg-8">
                                    <input type="text" className={validator(this.props.values['designationOfApplicant'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="designationOfApplicant" value={this.props.values.designationOfApplicant} name="designationOfApplicant"
                                        placeholder="Designation of the Applicant"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>}

                {/* // third line end */}




                {/* start fourth line.... */}
                {(this.props.type === "Residence") ?
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className={selectBoxValidator(this.props.values['residingSince'], isSubmitting) ? "col-sm-5 col-md-5 col-lg-4 displaySelectBoxError" : "col-sm-5 col-md-5 col-lg-4"} htmlFor="residingSince">Residing since:</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <Select
                                        id="residingSince"
                                        name="residingSince"
                                        value={this.props.values.residingSince}
                                        options={this.props.constants.residingYears}
                                        onChange={(ev) => this.props.selectBoxChangeHandler("residingSince", ev)}
                                        onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                        allowCreate={true}
                                        Creatable={true}
                                        closeOnSelect={true}
                                        noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("residingSince", "residingYears")} /></div>}
                                    />
                                    {/* <input type="text" className="form-control displayView" id="residingSince" name="residingSince" value={this.props.values.residingSince} placeholder="Residing since" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-sm-4" htmlFor="telephone">Telephone:</label>
                                <div className="col-sm-8">
                                    <MaskedInput mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                        className={validator(this.props.values['telephone'], 11, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="telephone" name="telephone" placeholder="Telephone" value={this.props.values.telephone}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="applicantCNIC">Applicant CNIC #</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                                        className={validator(this.props.values['applicantCNIC'], 15, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="applicantCNIC" name="applicantCNIC" placeholder="Applicant CNIC" value={this.props.values['applicantCNIC']}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    {/* <input type="text" className="form-control displayView" id="applicantCNIC" name="applicantCNIC" placeholder="Applicant CNIC" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)}/> */}
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-4" htmlFor="telephone">Telephone:</label>
                                <div className="col-sm-8">
                                    <input type="text" className={validator(this.props.values['telephone'], 11, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="telephone" name="telephone" placeholder="Telephone"
                                        value={this.props.values.telephone}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>

                        </div>
                    </div>}



                {/* end of fourth line */}





                {/* start of line fifth */}


                <div className="row">
                    {(this.props.type === "Residence") ?
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="applicantCNIC">Applicant CNIC #</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                                        className={validator(this.props.values['applicantCNIC'], 15, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="applicantCNIC" value={this.props.values['applicantCNIC']} name="applicantCNIC"
                                        placeholder="Applicant CNIC"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    {/* <input type="text" className="form-control displayView" id="applicantCNIC" name="applicantCNIC" placeholder="Applicant CNIC" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)}/> */}
                                </div>
                            </div>
                        </div> :
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="businessmanNTN">If businessman, NTN #</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    {/* <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]} className="form-control displayView" id="businessmanNTN" name="businessmanNTN" placeholder="Applicant CNIC" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                                    <input type="text" className={validator(this.props.values['businessmanNTN'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="businessmanNTN" name="businessmanNTN" placeholder="If businessman, NTN #"
                                        value={this.props.values['businessmanNTN']}
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        </div>
                    }




                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="col-sm-4" htmlFor="mobile">Mobile #</label>
                            <div className="col-sm-8">
                                <MaskedInput mask={[/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                    className={validator(this.props.values['mobile'], 11, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="mobile" name="mobile" placeholder="Mobile" value={this.props.values['mobile']}
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                {/* <input type="text" className="form-control displayView" id="mobile" name="mobile" placeholder="Mobile" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} /> */}
                            </div>
                        </div>


                    </div>
                </div>

                {/* end of line fifth */}

                {(this.props.type === "Residence") ?
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="metPersonCNIC">Met (Person/Lady) CNIC #</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <MaskedInput mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                                        className={validator(this.props.values['metPersonCNIC'], 15, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="metPersonCNIC" name="metPersonCNIC" value={this.props.values['metPersonCNIC']} placeholder="Met (Person/Lady) CNIC"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    {/* <input type="text" className="form-control displayView" id="metPersonCNIC" name="metPersonCNIC" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} placeholder="Met (Person/Lady) CNIC" /> */}
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div className="row">

                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className={selectBoxValidator(this.props.values['yearInBusiness'], isSubmitting) ? "col-sm-5 col-md-5 col-lg-4 displaySelectBoxError" : "col-sm-5 col-md-5 col-lg-4"} htmlFor="yearInBusiness">Year in businessman/employement:</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <Select
                                        id="yearInBusiness"
                                        name="yearInBusiness"
                                        value={this.props.values.yearInBusiness}
                                        options={this.props.constants.residingYears}
                                        onChange={(ev) => this.props.selectBoxChangeHandler("yearInBusiness", ev)}
                                        onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                        allowCreate={true}
                                        Creatable={true}
                                        closeOnSelect={true}
                                        noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("yearInBusiness", "residingYears")} /></div>}
                                    />
                                    {/* <input className="form-control displayView" id="yearInBusiness" name="yearInBusiness" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} value={this.props.values['yearInBusiness']} placeholder="Year in businessman/employement" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="howLongAtGivenAddress">How long at given address:</label>
                                <div className="col-sm-7 col-md-7 col-lg-8">
                                    <input type="text" className={validator(this.props.values['howLongAtGivenAddress'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="howLongAtGivenAddress" name="howLongAtGivenAddress"
                                        value={this.props.values['howLongAtGivenAddress']} placeholder="How long at given address"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    {/* <input type="text" className="form-control displayView" id="metPersonCNIC" name="metPersonCNIC" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} placeholder="Met (Person/Lady) CNIC" /> */}
                                </div>
                            </div>
                        </div>
                    </div>



                }

                <div className="row">
                    {(this.props.type === "Residence") ?
                        <div>
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <label className={radioBtnValidator(this.props.values['residenceIs'], isSubmitting) ? "col-sm-3 displayRadioError" : "col-sm-3"}  >Residence is:</label>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="residenceIs" id="residenceIs" value="owend" checked={this.props.values.residenceIs === "owend"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Owend </label>
                                </div>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="residenceIs" id="residenceIs" value="rented" checked={this.props.values.residenceIs === "rented"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Rented </label>
                                </div>
                                <div className="col-sm-3">
                                    <label className="check-inline"><input type="radio" name="residenceIs" id="residenceIs" value="parentOrJFamily" checked={this.props.values.residenceIs === "parentOrJFamily"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Parent/J.Family </label>
                                </div>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="residenceIs" id="residenceIs" value="other" checked={this.props.values.residenceIs === "other"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Other </label>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                    <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="rentAmount"> Rent Amount</label>
                                    <div className="col-sm-7 col-md-7 col-lg-8">
                                        <input type="number" className={validator(this.props.values['rentAmount'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="rentAmount" name="rentAmount" placeholder="Rent Amount" value={this.props.values['rentAmount']}
                                            onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div> :

                        <div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <label className={radioBtnValidator(this.props.values['OfficePremisesStatus'], isSubmitting) ? "col-sm-2 displayRadioError" : "col-sm-2"} >Office premises status:</label>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="OfficePremisesStatus" id="OfficePremisesStatus" value="owend" checked={this.props.values.OfficePremisesStatus === "owend"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Owend</label>
                                </div>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="OfficePremisesStatus" id="OfficePremisesStatus" value="rented" checked={this.props.values.OfficePremisesStatus === "rented"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Rented</label>
                                </div>
                                <div className="col-sm-2">
                                    <label className="check-inline"><input type="radio" name="OfficePremisesStatus" id="OfficePremisesStatus" value="other" checked={this.props.values.OfficePremisesStatus === "other"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Other</label>
                                </div>

                                <div>
                                    <label className="col-sm-2" htmlFor="rentAmount"> Rent Amount</label>
                                    <div className="col-sm-2">
                                        <input type="number" className={validator(this.props.values['rentAmount'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                            id="rentAmount" name="rentAmount" placeholder="Rent Amount" value={this.props.values['rentAmount']}
                                            onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-sm-4 col-md-4 col-lg-4"> */}
                            {/* </div> */}
                        </div>}
                </div>

                <div className="row">
                    {(this.props.type !== "Residence") ?

                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <label className={radioBtnValidator(this.props.values['applicantStatus'], isSubmitting) ? "col-sm-2 displayRadioError" : "col-sm-2"} >Status of the applicant:</label>
                            <div className="col-sm-2">
                                <label className="check-inline"><input type="radio" name="applicantStatus" id="applicantStatus" value="businessmen" checked={this.props.values.applicantStatus === "businessmen"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Businessmen</label>
                            </div>
                            <div className="col-sm-2">
                                <label className="check-inline"><input type="radio" name="applicantStatus" id="applicantStatus" value="salaried" checked={this.props.values.applicantStatus === "salaried"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Salaried</label>
                            </div>
                            <div className="col-sm-2">
                                <label className="check-inline"><input type="radio" name="applicantStatus" id="applicantStatus" value="partner" checked={this.props.values.applicantStatus === "partner"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Partner</label>
                            </div>
                            <div className="col-sm-2">
                                <label className="check-inline"><input type="radio" name="applicantStatus" id="applicantStatus" value="selfEmployed" checked={this.props.values.applicantStatus === "selfEmployed"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Self Employed</label>
                            </div>
                        </div> : null}
                </div>


                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['clientOfBank'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="clientOfBank">Existing client of Bank:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="clientOfBank" id="clientOfBank" value="yes" checked={this.props.values.clientOfBank === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Yes </label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="clientOfBank" id="clientOfBank" value="no" checked={this.props.values.clientOfBank === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> No </label>
                            </div>

                        </div>


                    </div>

                    {(this.props.type !== "Residence") ?
                        <div className="col-sm-6">

                            <div className="form-group">
                                <label className={radioBtnValidator(this.props.values['Ifsalaried'], isSubmitting) ? "col-sm-4 displayRadioError" : "col-sm-4"} htmlFor="Ifsalaried">If salaried:</label>
                                <div className="col-sm-4">
                                    <label className="check-inline"><input type="radio" name="Ifsalaried" id="Ifsalaried" value="permanent" checked={this.props.values.Ifsalaried === "permanent"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Permanent </label>
                                </div>
                                <div className="col-sm-4">
                                    <label className="check-inline"><input type="radio" name="Ifsalaried" id="Ifsalaried" value="nonPermanent" checked={this.props.values.Ifsalaried === "nonPermanent"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Non Permanent </label>
                                </div>

                            </div>


                        </div> :
                        <div></div>}

                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['vehicleOwned'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="vehicleOwned">Any other vehicle owned:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="vehicleOwned" id="vehicleOwned" value="yes" checked={this.props.values.vehicleOwned === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Yes</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="vehicleOwned" id="vehicleOwned" value="no" checked={this.props.values.vehicleOwned === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> No</label>
                            </div>

                        </div>


                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={selectBoxValidator(this.props.values['make'], isSubmitting) ? "col-sm-1 displaySelectBoxError" : "col-sm-1"} htmlFor="make">Make:</label>
                            <div className="col-sm-3">
                                <Select
                                    id="make"
                                    name="make"
                                    value={this.props.values.make}
                                    options={this.props.constants.carsCompanies}
                                    onChange={(ev) => this.props.selectBoxChangeHandler("make", ev)}
                                    onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                    allowCreate={true}
                                    Creatable={true}
                                    closeOnSelect={true}
                                    noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("make", "carsCompanies")} /></div>}
                                />
                                {/* <input type="text" className="form-control displayView" id="make" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} placeholder="Make" /> */}
                            </div>
                            <label className={selectBoxValidator(this.props.values['model'], isSubmitting) ? "col-sm-1 displaySelectBoxError" : "col-sm-1"} htmlFor="model">Model:</label>
                            <div className="col-sm-3">
                                <Select
                                    id="model"
                                    name="model"
                                    value={this.props.values.model}
                                    options={this.props.constants.models}
                                    onChange={(ev) => this.props.selectBoxChangeHandler("model", ev)}
                                    onInputKeyDown={(ev) => this.props.selectBoxInputChangeHandler(ev.target.value)}
                                    allowCreate={true}
                                    Creatable={true}
                                    closeOnSelect={true}
                                    noResultsText={<div style={{ textAlign: 'center' }}>Want to add above? <RaisedButton label={<i className="fa fa-plus"></i>} onClick={() => this.props.addNewToselectBox("model", "models")} /></div>}
                                />
                                {/* <input type="text" className="form-control displayView" id="model" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} placeholder="Model" /> */}
                            </div>
                            <label className="col-sm-1" htmlFor="reg">Reg#</label>
                            <div className="col-sm-3">
                                <input type="text" className={validator(this.props.values['reg'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="reg" name="reg" value={this.props.values['reg']} placeholder="Reg #"
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['fiancialFacility'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="fiancialFacility">Availing any finacial facility:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="fiancialFacility" id="fiancialFacility" value="yes" checked={this.props.values.fiancialFacility === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />Yes</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="fiancialFacility" id="fiancialFacility" value="no" checked={this.props.values.fiancialFacility === "no"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} />No</label>
                            </div>

                        </div>


                    </div>
                    <div className="col-sm-6">

                        <label className="col-sm-5" htmlFor="institution">If yes, Institution name:</label>
                        <div className="col-sm-7">
                            <input type="text" className={validator(this.props.values['institution'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                id="institution" value={this.props.values['institution']} placeholder="Institution name" disabled={this.props.values['fiancialFacility'] === "" || this.props.values['fiancialFacility'] === "no" || !this.props.values['fiancialFacility'] || this.props.values['fiancialFacility'] === null}
                                onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
