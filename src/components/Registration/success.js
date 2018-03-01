import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {generatePdf} from '../../utils/common';

import '../../assets/css/form-style.css';

class Success extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            beneficiaries: [],
            reason: [],
        }
        this.generateFormPdf = this.generateFormPdf.bind(this)
    }
    componentDidMount() {
        console.log(this.props.data.schoolMap)
        let beneficiaries = []
        this.props.data.Ben.map((benData) => {
            beneficiaries.push(benData.data.Full_Name__c);
        })
        this.setState({beneficiaries})

        if(this.props.data.HouStatusEmployement.filter(i => i !== 'Unemployed').length <= 1) {
            this.props.data.Alcoholism__c && this.state.reason.push("Alcoholism");
            this.props.data.Chronic_Illness__c && this.state.reason.push("Chronic Illness");
            this.props.data.Cultural_or_personal_belief__c && this.state.reason.push("Cultural or personal belief");
            this.props.data.Disability__c && this.state.reason.push("Disability");
            this.props.data.Drug_Addiction__c && this.state.reason.push("Drug Addiction");
            this.props.data.Gambling_Addiction__c && this.state.reason.push("Gambling Addiction");
            this.props.data.Low_Education__c && this.state.reason.push("Low Education");
            this.props.data.Social_Visit_Pass__c && this.state.reason.push("Social Visit Pass");
            this.props.data.Temporarily_unfit_for_work__c && this.state.reason.push("Temporarily Unit of Work");
            this.props.data.Other_Reason_Description__c !== '' && this.state.reason.push(this.props.data.Other_Reason_Description__c);
        }
        console.log('successreason', this.state)
    }
    generateFormPdf() {
        generatePdf(this.props.data);
    }
    render() {
        const props = this.props.data
        return (
            <div className="container body" id="succeedPage">
                <div className="col-md-12" id="logoHeader">
                    <div className="col-md-2">
                    <img src={require('../../assets/img/spmf_logo.jpg')} width="150px"/>
                    </div>
                    <div className="col-md-10">
                        <br /><br />
                        <h3 style={{ color:"#0590ba"}}>&nbsp;&nbsp;STSPMF Application Form</h3>
                    </div>
                </div>
                {/* Tab 1 Content */}
                <div className="col-md-12" style={{ marginTop: "40px"}}>
                    <h4 className="info-text">Eligibility Criteria</h4>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input 
                                    type="checkbox"
                                    name="check4" 
                                    id="check4"
                                    checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input 
                                    type="checkbox"
                                    name="check5"
                                    id="check5"
                                    checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Family is living in a 4-room HDB flat or smaller
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input type="checkbox" name="check6" id="check6" checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Family has a gross per capita income (PCI) of $625/ month or less
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input type="checkbox" name="check7" id="check7" checked /> 
                            </div>
                            <div className="col-sm-11 text-content">
                                Is not concurrently receiving School Pocket Money Fund from any other STSPMF disbursing agency/school or any other similar schemes except MOE Financial Assistance Scheme
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input type="checkbox" name="check8" id="check8" checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input type="checkbox" name="check9" id="check9" checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">
                                <input type="checkbox" name="check10" id="check10" checked />
                            </div>
                            <div className="col-sm-11 text-content">
                                Student is 20 years or younger at point of application
                            </div>
                        </div>
                    <hr />
                    <h4 className="info-text">All completed STSPMF application forms must be attached with the relevant documents listed below:</h4>
                    <div className="row">    
                        <div className="col-sm-1 checkContainer">
                            <input type="checkbox" name="check1" id="check1" checked />
                        </div>
                        <div className="col-sm-11 text-content">
                            Photocopy of student(s)’s NRIC / birth certificate
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1 checkContainer">
                            <input type="checkbox" name="check2" id="check2" checked />
                        </div>
                        <div className="col-sm-11 text-content">
                            Photocopy of both parents’/ guardian’s NRIC / passport
                        </div>
                    </div>
                    <br />
                    <p className="red">STSPMF reserves the right to reject the application if any of the supporting documents is not submitted</p>
                    <br/>
                    <hr />
                </div>
                {/* Tab 2 Content */}
                <div className="col-md-12 print">
                    <h4 className="info-text">Application Profile</h4>
                    <br />
                    <p><b>Personal Details</b></p>
                    {/* Row 1 */}
                    <div className="row">
                        {/* FullName */}
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Full Name</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Full_Name__c}</p>
                            </div>
                        </div>
                        {/* Gender */}
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Gender</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Gender__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="row">
                        {/* ID Type */}
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>ID Type</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.ID_Number__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Nationality</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Nationality__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 3 */}
                    <div className="row">
                        {/* Date of Birth */}
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Date of Birth</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Date_of_Birth__c}</p>
                            </div>
                        </div>
                        {/* Other Nationality */}
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Other Nationality</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Other_Nationality__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 4 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Marital Status</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Marital_Status__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Race</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Race__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 5 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Other Marital Status</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Other_Marital_Status__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Other Race</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Other_Race__c}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <p><b>Address</b></p>
                    {/* Row 6 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Postal Code</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Postal__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Type of Flat</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Flat_Type__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 7 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Street Name</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Street__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Other Type of Flat</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Other_Flat_Type__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 8 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Blok Number</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Block__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Country</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Country__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 9 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Unit Number</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Unit_Number__c}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <p><b>Personal Contact</b></p>
                    {/* Row 10 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Contact Number</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Contact_Number__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Mobile Phone</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Mobile_Phone__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 11 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Home Phone</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Home_Phone__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Office Phone</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Office_Number__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 12 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Email</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Email_Address__c}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr />
                </div>
                {/* Tab 3 Content */}
                <div className="col-md-12">
                    <br />
                    <h4 className="info-text">Beneficiary List</h4>
                    {props.Ben.map((benData, benIdx) => {
                        return(
                            <div>
                                <br />
                                <p><b> Beneficiary - {benIdx+1}</b></p>
                                {/* Name - NRIC */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Name</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Full_Name__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>NRIC</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.ID_Number__c}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Date of Birth - Race */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Date of Birth</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Date_of_Birth__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Race</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Race__c}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Gender - Nationality */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Gender</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Gender__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Nationality</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Nationality__c}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Current Level - School */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Current Level</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Current_Level__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>School</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{props.schoolMap[benData.data.Current_School__c]}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Stream - Applying to */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Stream</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Stream__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Applying to</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{props.schoolMap[benData.data.Applying_to__c]}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Email - UploadedFile */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Email</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.data.Email_Address__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>NRIC file</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="filled">{benData.attachment.Name}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Graduating this year */}
                            </div>
                        )
                    })}
                    <br/>
                    <hr />
                </div>
                {/* Tab 4 Content */}
                <div className="col-md-12">
                    <br />
                    <h4 className="info-text">Household Member List</h4>
                    <br />
                    <p><b>Main Applicant</b></p>
                    <div className="row">
                    </div>
                    {/* Main Applicant Name - NRIC */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Name</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Full_Name__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>NRIC</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Full_Name__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant Date of Birth - Race */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Date of Birth</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Date_of_Birth__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Race</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Race__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant Gender - Nationality */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Gender</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Gender__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Nationality</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Nationality__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant Relationship To Applicant - Gross Monthly Income */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Relationship to Applicant</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Relationship_to_Applicant__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Gross Monthly Income</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Gross_Monthly_Income__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant - Employment Status - Employment Start Date */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Employment Status</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Employment_Status__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Employment Start Date</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Employment_Start_Date__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant Occupation - Company */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Occupation</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Occupation__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Company</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Company__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Uploaded File NRIC and Income Receipt*/}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>NRIC Uploaded File</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Hou[0].attachment.file1 ? props.Hou[0].attachment.file1.Name : ''}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Income Statement Receipt </p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Hou[0].attachment.file2 ? props.Hou[0].attachment.file2.Name : ''}</p>
                            </div>
                        </div>
                    </div>
                    {/* Uploaded File Payslip*/}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Payslip Uploaded File</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p className="filled">{props.Hou[0].attachment.file3 ? props.Hou[0].attachment.file3.Name : ''}</p>
                            </div>
                        </div>
                    </div>
                    {props.Hou.map((houData, houIdx) => {
                        if (houIdx > 0) {
                            return(
                                <div>
                                    <br />
                                    <p><b>Member - {houIdx + 1}</b></p>
                                    <div className="row">
                                    </div>
                                    {/* Hou Name - NRIC */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Name</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Full_Name__c}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>NRIC</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Full_Name__c}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hou Date of Birth - Race */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Date of Birth</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Date_of_Birth__c}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Race</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Race__c}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hou Gender - Nationality */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Gender</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Gender__c}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Nationality</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Nationality__c}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hou - Relationship to Applicant - Gross Monthly Income */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Relationship to Applicant</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Relationship_to_Applicant__c}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Gross Monthly Income</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Gross_Monthly_Income__c}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hou - Employment Status - Employment Start Date */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Employment Status</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Employment_Status__c}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Employment Start Date</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Employment_Start_Date__c}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hou Occupation - Company */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Occupation</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Occupation__c ? houData.data.Occupation__c : ''}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Company</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.data.Company__c ? houData.data.Company__c : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Uploaded File */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>NRIC Uploaded File</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.attachment.file1 ? houData.attachment.file1.Name : ''}</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Income Statement Receipt </p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.attachment.file2 ? houData.attachment.file2.Name : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Uploaded File Payslip*/}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="col-sm-5">
                                                <p>Payslip Uploaded File</p>
                                            </div>
                                            <div className="col-sm-1">
                                                :
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="filled">{houData.attachment.file3 ? houData.attachment.file3.Name : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }   
                    })}
                    <br/>
                    <hr />
                    <div className="row">
                        <h4 className="info-text">Reason/s for not having an income earner / Having one income earner:</h4>
                        <ul>
                            {this.state.reason.map((reasonItem) => {
                                return(
                                    <li className="filled">{reasonItem}</li>
                                );
                            })}
                        </ul>
                    </div>
                    <br/>
                    <hr />
                </div>
                {/* Tab 5 Content */}
                <div className="col-md-12">
                    <div className="row">
                        <br />
                        <h4 className="info-text">Declaration of consent</h4>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">1.</div>
                            <div className="col-sm-11 text-content-consent">
                                I, <span className="span_name"></span> {props.Full_Name__c}, I/C No <span className="span_nric"></span> {props.ID_Number__c}, declare that [my child/children/ward (s)] is/are currently NOT receiving The Straits Times School Pocket Money Fund (STSPMF) from any other STSPMF disbursing agency/school and have not applied for STSPMF at another disbursing agency/school.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">2.</div>
                            <div className="col-sm-11 text-content-consent">
                               1. I declare that {this.state.beneficiaries.toString()} is/are NOT receiving other similar monthly pocket money schemes excluding MOE FAS.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">3.</div>
                            <div className="col-sm-11 text-content-consent">
                                I acknowledge that for the purpose of facilitating my application for the STSPMF, that is administered by the STSPMF through disbursing agencies and schools,
                                <div className="row">
                                    <div className="col-sm-1 checkContainer">a)</div>
                                    <div className="col-sm-11 text-content-consent">
                                        any and all agencies and schools that have any of my prior financial assistance or social assistance records may share the relevant information with STSPMF.
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-1 checkContainer">b)</div>
                                    <div className="col-sm-11 text-content-consent">
                                        that the record of this application, if approved, may be shared with STSPMF Trustees, the school and any agency or persons authorised by The Straits Times School Pocket Money Fund for the purpose of rendering me or assessing my eligibility for financial or other assistance in future occasions; or for research studies in which I, as a specific individual, shall not be identified; or for any other purpose prescribed or permitted under Singapore law. 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">4.</div>
                            <div className="col-sm-11 text-content-consent"> 
                                I acknowledge that the information I have provided is accurate. I understand that [my children / my ward(s)] data will be stored in the electronic Case Management System (and in future, any replacement system developed by STSPMF) and consent for the data to be shared with STSPMF and across other agencies for analysis and enhancement of service delivery. 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">5.</div>
                            <div className="col-sm-11 text-content-consent">
                                I am aware that the disbursing agency and/or STSPMF has the right to recover in full the STSPMF that was given to me, if I have provided inaccurate information, or withheld any relevant information from the school.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1 checkContainer">6.</div>
                            <div className="col-sm-11 text-content-consent"> 
                                I am aware that the STSPMF assistance is given for the benefit of [children/ ward(s)], for use as pocket money in school.
                            </div>   
                        </div>
                    </div>
                    <div className="row">
                        <h4 className="info-text">MEDIA COVERAGE </h4>
                        <ul className="noneul">
                            <li>This section seeks the consent of the STSPMF applicant to be featured and interviewed for articles on STSPMF. I, {props.Full_Name__c}, NRIC No {props.ID_Number__c}, to my Family/me being featured.</li>
                        </ul>
                    </div>
                </div>
                {/* Download Button */}
                <br/>
                <div className="col-md-12">
                    <br/><br />
                    <center>
                        <button className="btn" onClick={this.generateFormPdf}> Download File </button>
                    </center>
                </div>
            </div>
        )
    }
}

Success.propTypes = {
    title: PropTypes.string
};
Success.defaultProps = {
    title: 'tab1 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce
})

export default connect(mapStateToProps, mapDispatchToProps)(Success);