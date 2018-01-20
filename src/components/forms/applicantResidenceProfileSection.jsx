import React, { Component } from 'react';

/* import validator functions to validate fields*/
import { validator, radioBtnValidator, selectBoxValidator } from '../../utils/functions'
import './formStyles.css'


export default class ApplicantResidenceProfile extends Component {

    render() {
        const { isSubmitting } = this.props;

        return (
            <div>
                <br />
                <div className="subHeading"><p>Residence Profile</p></div>
                <br />
                <div className="row">
                    <div className="col-sm-12">

                        <label htmlFor="residenceType" className={radioBtnValidator(this.props.values['residenceType'], isSubmitting) ? "col-sm-2 displayRadioError" : "col-sm-2"}>Residence Type:</label>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="residenceType" value="house" checked={this.props.values.residenceType === "house"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> House</label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="residenceType" value="banglow" checked={this.props.values.residenceType === "banglow"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Banglow</label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="residenceType" value="portion" checked={this.props.values.residenceType === "portion"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Portion</label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="residenceType" value="appartment" checked={this.props.values.residenceType === "appartment"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Appartment</label>
                        </div>
                        <div className="col-sm-2">
                            <label className="radio-inline"><input type="radio" name="residenceType" value="other" checked={this.props.values.residenceType === "other"} onChange={(ev) => this.props.radioBtnChangeHandler(ev.target.name, ev.target.value)} /> Other</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['Nameplate'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 displayRadioError" : "col-sm-6 col-md-6 col-lg-6"}>Nameplate or signboard affixed:</label>
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
                                <input type="text" className={validator(this.props.values['underNameOf'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    name="underNameOf" placeholder="Under the name of" id="underNameOf" value={this.props.values['underNameOf']}
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-md-3 col-lg-3">
                        <label className="col-md-12 col-sm-12 col-lg-12" htmlFor="resideHere"> Residence Color:</label>
                    </div>
                    <div className="col-sm-8 col-md-9 col-lg-9">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-sm-3" htmlFor="buildingColor"> Building </label>
                                <div className="col-sm-9">
                                    <input type="text" className={validator(this.props.values['buildingColor'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="buildingColor" value={this.props.values.buildingColor} name="buildingColor" placeholder="Building"
                                        onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label className="col-sm-3" htmlFor="gateColor"> Gate: </label>
                                <div className="col-sm-9">
                                    <input type="text" className={validator(this.props.values['gateColor'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                        id="gateColor" value={this.props.values.gateColor} name="gateColor" placeholder="Gate" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className={radioBtnValidator(this.props.values['localProperNumbering'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 labelTextSmall displayRadioError" : "col-sm-6 col-md-6 col-lg-6 labelTextSmall"} >Locality has proper numbering:</label>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="localProperNumbering" value="yes" checked={this.props.values.localProperNumbering === "yes"} onChange={(ev) => this.props.radioBtnChangeHandler("localProperNumbering", ev.target.value)} />Yes</label>
                            </div>
                            <div className="col-sm-3 col-md-3 col-lg-3">
                                <label className="radio-inline"><input type="radio" name="localProperNumbering" value="no" checked={this.props.values.localProperNumbering === "no"} onChange={(ev) => this.props.radioBtnChangeHandler("localProperNumbering", ev.target.value)} />No</label>
                            </div>

                        </div>

                    </div>
                    <div className="col-sm-6">

                        <div className="form-group">
                            <label className="col-sm-5 col-md-4 col-lg-4" htmlFor="coveredArea">Approx. Covered Area:</label>
                            <div className="col-sm-7 col-md-8 col-lg-8">
                                <input type="text" className={validator(this.props.values['coveredArea'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="coveredArea" value={this.props.values.coveredArea} name="coveredArea"
                                    placeholder="Approx. Covered Area"
                                    onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">

                            <label className={radioBtnValidator(this.props.values['politicallyAffiliatedArea'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 labelTextSmall displayRadioError" : "col-sm-6 col-md-6 col-lg-6 labelTextSmall"}>Politically affiliated area:</label>
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
                                <input type="text" className={validator(this.props.values['nearestLandMark'], 3, isSubmitting) ? "form-control displayErrorView" : "form-control displayView"}
                                    id="nearestLandMark" value={this.props.values.nearestLandMark} name="nearestLandMark"
                                    placeholder="Nearest land Mark" onChange={(ev) => this.props.inputChangeHandler(ev.target.id, ev.target.value)} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="form-group">

                            <label className={radioBtnValidator(this.props.values['infrastructureOfArea'], isSubmitting) ? "col-sm-6 col-md-6 col-lg-6 labelTextSmall displayRadioError" : "col-sm-6 col-md-6 col-lg-6 labelTextSmall"}>Infrastructure quality of area:</label>
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
