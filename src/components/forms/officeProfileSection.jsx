import React, { Component } from 'react';


/* import validator function to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'
import './formStyles.css'

export default class OfficeProfileSection extends Component {

    render() {
        const { isSubmitting } = this.props;

        return (
            <div>
                <br />
                <div className="subHeading"><p>Office Profile</p></div>
                <br />
                <div className="row">
                    <div className="col-sm-12">

                        <label className={radioBtnValidator(this.props.values['officeType'], isSubmitting) ? "col-sm-2 displayRadioError" : "col-sm-2"}>Office Type:</label>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="officeType" value="office" checked={this.props.values.officeType === "office"} onChange={(ev) => this.props.radioBtnChangeHandler("officeType", ev.target.value)} /> Office</label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="officeType" value="factory" checked={this.props.values.officeType === "factory"} onChange={(ev) => this.props.radioBtnChangeHandler("officeType", ev.target.value)} /> Factory </label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="officeType" value="shopOrShowroom" checked={this.props.values.officeType === "shopOrShowroom"} onChange={(ev) => this.props.radioBtnChangeHandler("officeType", ev.target.value)} /> Shop/Showroom</label>
                        </div>
                        {/* <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="officeType" value="appartment" checked={this.props.values.officeType === "appartment"} onChange={(ev) => this.props.radioBtnChangeHandler("officeType", ev.target.value)} /> Appartment</label>
                        </div> */}
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="officeType" value="other" checked={this.props.values.officeType === "other"} onChange={(ev) => this.props.radioBtnChangeHandler("officeType", ev.target.value)} /> Other</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['Nameplate'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="Nameplate">Nameplate or signboard affixed:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="Nameplate" value="yes" checked={this.props.values.Nameplate === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler("Nameplate", ev.target.value)} /> Yes </label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="Nameplate" value="no" checked={this.props.values.Nameplate === "no"} onChange={(ev) => this.props.radioBtnChangeHandler("Nameplate", ev.target.value)} /> No </label>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-5" htmlFor="underNameOf">Under the name of:</label>
                            <div className="col-sm-7">
                                <input type="text"
                                    className={validator(this.props.values['underNameOf'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    placeholder="Under the name of" id="underNameOf" value={this.props.values.underNameOf}
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-3">

                        <label className={radioBtnValidator(this.props.values['employerStatus'], isSubmitting) ? "col-md-12 col-sm-12 col-lg-12 displayRadioError" : "col-md-12 col-sm-12 col-lg-12"} htmlFor="employerStatus"> Business/Employer Status:</label>
                    </div>
                    <div className="col-sm-8 col-md-9 col-lg-9">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="radio-inline"><input type="radio" name="employerStatus" value="proprietor" checked={this.props.values.employerStatus === "proprietor"} onChange={(ev) => this.props.radioBtnChangeHandler("employerStatus", ev.target.value)} /> ProprietorShip </label>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="radio-inline"><input type="radio" name="employerStatus" value="partnership" checked={this.props.values.employerStatus === "partnership"} onChange={(ev) => this.props.radioBtnChangeHandler("employerStatus", ev.target.value)} /> Partnership </label>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="radio-inline"><input type="radio" name="employerStatus" value="pvtLtd" checked={this.props.values.employerStatus === "pvtLtd"} onChange={(ev) => this.props.radioBtnChangeHandler("employerStatus", ev.target.value)} /> Pvt. Ltd </label>
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-3">
                            <label className="radio-inline"><input type="radio" name="employerStatus" value="listedCompany" checked={this.props.values.employerStatus === "listedCompany"} onChange={(ev) => this.props.radioBtnChangeHandler("employerStatus", ev.target.value)} /> Listed Company </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-5 col-md-5 col-lg-4" htmlFor="businessNature">Nature Of Business:</label>
                            <div className="col-sm-7 col-md-7 col-lg-8">
                                <input type="text"
                                    className={validator(this.props.values['businessNature'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="businessNature" name="businessNature" value={this.props.values.businessNature} placeholder="Nature Of Business" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="coveredArea">Approx. Covered Area:</label>
                            <div className="col-sm-7 col-md-8 col-lg-8">
                                <input type="text"
                                    className={validator(this.props.values['coveredArea'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="coveredArea" value={this.props.values.coveredArea} name="coveredArea" placeholder="Approx. Covered Area" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">

                            <label className={radioBtnValidator(this.props.values['officeSetup'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"} htmlFor="officeSetup">Office Setup:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="officeSetup" id="officeSetup" value="excelent" checked={this.props.values.officeSetup === "excelent"} onChange={(ev) => this.props.radioBtnChangeHandler("officeSetup", ev.target.value)} /> Excelent</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="officeSetup" id="officeSetup" value="usual" checked={this.props.values.officeSetup === "usual"} onChange={(ev) => this.props.radioBtnChangeHandler("officeSetup", ev.target.value)} /> Usual </label>
                            </div>

                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="officeSetup" id="officeSetup" value="unusual" checked={this.props.values.officeSetup === "unusual"} onChange={(ev) => this.props.radioBtnChangeHandler("officeSetup", ev.target.value)} /> Unusual </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">

                        <div className="form-group">
                            <label className="col-sm-4 col-md-2 col-lg-2" htmlFor="unusualexplain">If unusual , Please explain:</label>
                            <div className="col-sm-8 col-md-10 col-lg-10">
                                <input type="text"
                                    className={validator(this.props.values['unusualexplain'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="unusualexplain" value={this.props.values.unusualexplain} name="unusualexplain" placeholder="If unusual, Please explain" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">

                            <label className={radioBtnValidator(this.props.values['politicallyAffiliatedArea'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 labelTextSmall displayRadioError" : "col-sm-6 col-md-6 col-lg-6 labelTextSmall"} >Politically affiliated area:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="politicallyAffiliatedArea" id="politicallyAffiliatedArea" value="yes" checked={this.props.values.politicallyAffiliatedArea === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler("politicallyAffiliatedArea", ev.target.value)} /> Yes</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="politicallyAffiliatedArea" id="politicallyAffiliatedArea" value="no" checked={this.props.values.politicallyAffiliatedArea === "no"} onChange={(ev) => this.props.radioBtnChangeHandler("politicallyAffiliatedArea", ev.target.value)} /> No</label>
                            </div>

                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="nearestLandMark">Nearest land Mark:</label>
                            <div className="col-sm-7 col-md-8 col-lg-8">
                                <input type="text"
                                    className={validator(this.props.values['nearestLandMark'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="nearestLandMark" value={this.props.values.nearestLandMark} name="nearestLandMark" placeholder="Nearest land Mark" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">

                            <label className={radioBtnValidator(this.props.values['infrastructureOfArea'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 labelTextSmall displayRadioError" : "col-sm-6 col-md-6 col-lg-6 labelTextSmall"} >Infrastructure quality of area:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="infrastructureOfArea" id="infrastructureOfArea" value="normal" checked={this.props.values.infrastructureOfArea === "normal"} onChange={(ev) => this.props.radioBtnChangeHandler("infrastructureOfArea", ev.target.value)} /> Normal </label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="infrastructureOfArea" id="infrastructureOfArea" value="good" checked={this.props.values.infrastructureOfArea === "good"} onChange={(ev) => this.props.radioBtnChangeHandler("infrastructureOfArea", ev.target.value)} /> Good </label>
                            </div>

                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="col-sm-4 col-md-3 col-lg-3">
                            <label className="radio-inline"><input type="radio" name="infrastructureOfArea" id="infrastructureOfArea" value="poor" checked={this.props.values.infrastructureOfArea === "poor"} onChange={(ev) => this.props.radioBtnChangeHandler("infrastructureOfArea", ev.target.value)} /> Poor </label>
                        </div>

                    </div>
                </div>
            </div>

        )

    }
}
