import React, { Component } from 'react';
/* Material UI */
import { RaisedButton } from 'material-ui';
/* Toast */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/* Form sections components*/
import FormHeader from './formHeader'   // header(logo, heading)
import ApplicantFormTopSection from './applicantFormTopSection'   // First Part
import ApplicantDetailsFormSection from './applicantDetailsFormSection'   // Second Part
import ApplicantInformationFormSection from './applicantInformationFormSection'  // Third Part
import OfficeProfileSection from './officeProfileSection'  // Fourth Part
import NeighbourConfirmation from './neighbourConfirmation'  // Fifth Part
import NeighbourConfirmation2 from './neighbourConfirmation2'  // Fifth Part

import CommentAndSignature from './commentAndSignatureSection'  // Sixth Part

/* other components*/
import { carsCompanies, residingYears, branches, relationships, meezanProducts, islamicProducts } from '../../constants'
import './formStyles.css'

export default class ApplicantOfficeForm extends Component {

    constructor() {
        super();
        this.arr = [];
        this.type = "Office";

        this.constants = {
            carsCompanies: carsCompanies,
            models: residingYears.slice(residingYears.map((y) => { return y.value }).indexOf(1970)),
            branches: branches,
            residingYears: residingYears,
            relationships: relationships,
            meezanProducts: meezanProducts,
            islamicProducts,

        }



        const minDate = new Date();
        minDate.setDate(minDate.getDate() - 2);
        console.log(minDate);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);
        console.log(maxDate);

        this.state = {
            /* start form state properties */
            form: {
                visitTime: "",
                applicationNo: "",
                givenDate: null,
                dileveryDate: null,
                applicantName: "",
                officeName: "",
                officeAddress: "",
                givenAddress: "",
                metAppicant: "",
                workGivenAddress: "",
                nameOfPersonMet: "",
                designationMetPerson: "",
                designationOfApplicant: "",
                telephone: "", mobile: "",
                howLongAtGivenAddress: "",
                applicantCNIC: "",
                businessmanNTN: "",
                OfficePremisesStatus: "",
                applicantStatus: "",
                rentAmount: "",
                clientOfBank: "",
                Ifsalaried: "",
                reg: "",
                vehicleOwned: "",
                fiancialFacility: "",
                institution: "",
                officeType: "",
                underNameOf: "",
                employerStatus: "",
                businessNature: "",
                coveredArea: "",
                unusualexplain: "",
                officeSetup: "",
                Nameplate: "",
                nearestLandMark: "",
                infrastructureOfArea: "",
                politicallyAffiliatedArea: "",
                nameOfPersonMetNB2: "",
                addressNB2: "",
                knowTheApplcantNB2: "",
                residencIsNB2: "",
                nameOfPersonMetNB1: "",
                addressNB1: "",
                knowTheApplcantNB1: "",
                residencIsNB1: "",
                comment: "",
                verification: "",
                dateOfVisit: null,
                branch: null,
                model: null,
                make: null,
                yearInBusiness: null,
                residencSinceNB1: null,
                residencSinceNB2: null,
                product: null
            },
            /* end form state properties */

            /* Other state properties start here */
            minDate: minDate,
            maxDate: maxDate,
            tempSelectedValue: null,
            isSubmitting: false
        }
    }
    componentWillMount() {
        let { form } = this.state;
        form['applicantName'] = this.props.editingUser['name'];
        form['officeAddress'] = this.props.editingUser['workAddress'];
        this.setState({ form })
    }

    componentDidMount() {
        let [{ form }, { formData }] = [this.state, this.props];
        if (Object.keys(formData).length > 0) {
            for (let key in formData) {
                form[key] = formData[key]
            }
        } else {
            form['applicantName'] = this.props.editingUser['name'];
            form['officeAddress'] = this.props.editingUser['officeAddress'];
        }
        this.setState({ form })
    }
    componentWillReceiveProps(newProps) {
        let [{ form }, { formData }] = [this.state, newProps];
        if (Object.keys(formData).length > 0) {
            for (let key in formData) {
                form[key] = formData[key]
            }
            this.setState({ form })
        }
    }

    // that for the dates given and delivery date start
    handleChangeMinDate(event, date, id) {
        this.inputChangeHandler(id, date)
        this.setState({
            minDate: date,
        }, () => { console.log(this.state.minDate) });
    };
    handleChangeMaxDate(event, date, id) {
        // console.log(id)
        this.inputChangeHandler(id, date)
        this.setState({
            maxDate: date,
        }, () => { console.log(this.state.maxDate) });
    };
    // that for the dates given and delivery date end

    inputChangeHandler(name, value) {
        let { form } = this.state;
        form[name] = value;
        this.setState({ form: form });

    }

    radioBtnChangeHandler(name, value) {
        this.arr.indexOf(name) === -1 ? this.arr.push(name) : null;
        let { form } = this.state;
        form[name] = value;
        this.setState({ form: form });
        // this.setState({ [name]: value })
    }

    selectBoxChangeHandler(name, value) {
        if (value == null) value = { value: null };
        let { form } = this.state;
        form[name] = value.value;
        this.setState({ form: form });
    }

    selectBoxInputChangeHandler(value) {
        this.setState({ tempSelectedValue: value })
    }

    addNewToselectBox(name, arrayName) {
        let { form } = this.state;
        form[name] = this.state.tempSelectedValue;
        this.setState({ form: form });
        const index = this.constants[arrayName].map((opt) => { return opt.value }).indexOf(this.state.tempSelectedValue);
        (index === -1) ? (this.constants[arrayName].push({ value: this.state.tempSelectedValue, label: this.state.tempSelectedValue }), this.selectBoxChangeHandler(name, this.state.tempSelectedValue)) : null;
    }

    submitForm() {
        const { form } = this.state;
        this.setState({ isSubmitting: !this.state.isSubmitting })
        for (let key in form) {
            if (form[key] === null || form[key] === "" || form[key].length === 0) {
                console.log("key", key);
                toast.error("Please Fill all Fields");
                return;
            }
        }
        // form['type'] = (this.type === "Office") ? "officeUrl" : "residenceUrl";
        form["officeRevise"] = (form["officeRevise"]) ? (form["officeRevise"] + 1) : 0;
        form['type'] = this.type || "Office";
        this.props.submitForm(form);
    }

    render() {
        return (
            <div style={{ width: '96%', marginLeft: 'auto', marginRight: 'auto' }}>
                <FormHeader type="Office" />
                <ApplicantFormTopSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} minDate={this.state.minDate} maxDate={this.state.maxDate} handleChangeMinDate={this.handleChangeMinDate.bind(this)} handleChangeMaxDate={this.handleChangeMaxDate.bind(this)} />
                <ApplicantDetailsFormSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <ApplicantInformationFormSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <OfficeProfileSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <div className="row">
                    <NeighbourConfirmation inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                    <NeighbourConfirmation2 inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                </div>
                <CommentAndSignature inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type="Office" isSubmitting={this.state.isSubmitting} minDate={this.state.minDate} maxDate={this.state.maxDate} />
                <div style={{ margin: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <RaisedButton label="Bacl" icon={<i className="fa fa-arrow-left"></i>} onClick={this.props.goBack} />
                    <RaisedButton label="Done" icon={<i className="fa fa-check"></i>} onClick={this.submitForm.bind(this)} />
                </div>
                <ToastContainer
                    style={{ zIndex: 999999 }}
                    position="top-center"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={true}
                />
                {/* <button onClick={()=>{console.log(this.arr)}}>click arry</button> */}


            </div>
        )

    }
}
