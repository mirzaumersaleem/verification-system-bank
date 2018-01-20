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
import ApplicantResidenceProfileSection from './applicantResidenceProfileSection'  // Fourth Part
import NeighbourConfirmation from './neighbourConfirmation'  // Fifth Part A
import NeighbourConfirmation2 from './neighbourConfirmation2'  // Fifth Part B
import CommentAndSignature from './commentAndSignatureSection'  // Sixth Part


// this.handleChangeMinDate = this.handleChangeMinDate.bind(this);








/* other components*/
import { carsCompanies, residingYears, branches, relationships, meezanProducts, islamicProducts } from '../../constants'
import './formStyles.css'

export default class ApplicantForm extends Component {

    constructor() {
        super();
        this.arr = [];
        this.type = "Residence";
        this.constants = {
            carsCompanies: carsCompanies,
            models: residingYears.slice(residingYears.map((y) => { return y.value }).indexOf(1970)),
            branches: branches,
            residingYears: residingYears,
            relationships: relationships,
            meezanProducts,
            islamicProducts
        }


        const minDate = new Date();
        minDate.setDate(minDate.getDate() - 2);
        console.log(minDate)
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        maxDate.setHours(0, 0, 0, 0);
        console.log(maxDate)



        this.state = {
            /* start form state properties */
            form: {
                noOfVisits: "",
                givenDate: null,
                dileveryDate: null,
                branch: "",
                applicationNo: "",
                // product: "",
                applicantName: "",
                residenceAddress: "",
                visitTime: "",
                givenAddress: "",
                metAppicant: "",
                resideHere: "",
                nameOfPersonMet: "",
                fatherOrhusbandName: "",
                telephone: "",
                mobile: "",
                applicantCNIC: "",
                residingSince: null,
                metPersonCNIC: "",
                residenceIs: "",
                clientOfBank: "",
                rentAmount: "",
                reg: "",
                vehicleOwned: "",
                fiancialFacility: "",
                institution: "",
                Nameplate: "",
                residenceType: "",
                buildingColor: "",
                underNameOf: "",
                gateColor: "",
                coveredArea: "",
                nearestLandMark: "",
                localProperNumbering: "",
                politicallyAffiliatedArea: "",
                infrastructureOfArea: "",
                nameOfPersonMetNB1: "",
                addressNB1: "",
                nameOfPersonMetNB2: "",
                addressNB2: "",
                applicantRelationShip: null,
                knowTheApplcantNB2: null,
                knowTheApplcantNB1: null,
                residencSinceNB1: null,
                residencIsNB1: null,
                residencIsNB2: null,
                residencSinceNB2: null,
                comment: "",
                model: null,
                make: null,
                verification: "",
                dateOfVisit: null,
                product: null,
                branch: null,


            },
            minDate: minDate,
            maxDate: maxDate,
            /* end form state properties */

            /* Other state properties start here */
            tempSelectedValue: null,
            isSubmitting: false

        }
    }

    componentWillMount() {
        let { form } = this.state;
        form['applicantName'] = this.props.editingUser['name'];
        form['residenceAddress'] = this.props.editingUser['residenceAddress'];
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
            form['residenceAddress'] = this.props.editingUser['residenceAddress'];
        }
        this.setState({ form })
    }

    componentWillReceiveProps(newProps) {
        let [{ form }, { formData }] = [this.state, newProps];
        if (Object.keys(formData).length > 0) {
            for (let key in formData) {
                if (form['givenDate'] || form['dileveryDate'] || form['dateOfVisit']) {
                    form[key] = new Date(formData[key])
                } else
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
        });
    };

    handleChangeMaxDate(event, date, id) {
        this.inputChangeHandler(id, date)
        this.setState({
            maxDate: date,
        });
    };
    // that for the dates given and delivery date end


    inputChangeHandler(name, value) {
        let { form } = this.state;
        form[name] = value;
        this.setState({ form: form });

    }

    radioBtnChangeHandler(name, value) {

        let { form } = this.state;
        form[name] = value;
        if (name === "fiancialFacility") { (form[name] === "no" || form[name] === "") ? form['institution'] = "" : null }
        this.setState({ form: form });
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
            if (key !== 'institution' || form[key] === null || form[key] === "" || form[key].length === 0) {
                console.log("key", key);
                toast.error("Please Fill all Fields");
                return;
            }
        }
        // form['type'] = (this.type === "Residence") ? "residenceUrl" : "officeUrl";
        form["residenceRevise"] = (form["residenceRevise"]) ? (form["residenceRevise"] + 1) : 0;
        form['type'] = this.type || "Residence";
        this.props.submitForm(form);
    }
    render() {
        return (
            <div style={{ width: '96%', marginLeft: 'auto', marginRight: 'auto' }}>
                <FormHeader type={this.type} />
                <ApplicantFormTopSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} minDate={this.state.minDate} maxDate={this.state.maxDate} handleChangeMinDate={this.handleChangeMinDate.bind(this)} handleChangeMaxDate={this.handleChangeMaxDate.bind(this)} />
                <ApplicantDetailsFormSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <ApplicantInformationFormSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <ApplicantResidenceProfileSection inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                <div className="row">
                    <NeighbourConfirmation inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                    <NeighbourConfirmation2 inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} selectBoxInputChangeHandler={this.selectBoxInputChangeHandler.bind(this)} addNewToselectBox={this.addNewToselectBox.bind(this)} selectBoxChangeHandler={this.selectBoxChangeHandler.bind(this)} constants={this.constants} isSubmitting={this.state.isSubmitting} />
                </div>
                <CommentAndSignature inputChangeHandler={this.inputChangeHandler.bind(this)} radioBtnChangeHandler={this.radioBtnChangeHandler.bind(this)} values={this.state.form} type={this.type} isSubmitting={this.state.isSubmitting} minDate={this.state.minDate} maxDate={this.state.maxDate} />
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

            </div>
        )
    }
}
