import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../assets/css/form-style.css';
import {generatePdf} from '../../utils/common';

class Success extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: '',
            beneficiaries: [],
        }
        this.generateFormPdf = this.generateFormPdf.bind(this)
    }
    componentDidMount() {
        let beneficiaries = []
        this.props.data.Ben.map((benData) => {
            beneficiaries.push(benData.data.Full_Name__c);
        })
        this.setState({beneficiaries})
    }
    generateFormPdf() {
        generatePdf(this.props.data);
    }
    render() {
        const props = this.props.data
        return (
            <div className="registrationForm">
            <div className="container body" id="succeedPage">
                <div className="col-md-12" id="logoHeader">
                    <div className="col-md-2">
                    <img src={require('../../assets/img/spmf_logo.jpg')} width="150px"/>
                    </div>
                    <div className="col-md-10">
                        <br /><br /><br /><br />
                        <h4>STSPMF Application Form</h4>
                    </div>
                </div>
                {/* Tab 1 Content */}
                <div className="col-md-12" style={{ marginTop: "40px"}}>
                    <p><b>Eligibility Criteria</b></p>
                    <ul className="ulnone">
                        <li>
                            <input 
                                type="checkbox"
                                name="check4" 
                                id="check4"
                                checked />
                            Student is a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)</li>
                        <li>
                            <input 
                                type="checkbox"
                                name="check5"
                                id="check5"
                                checked />
                            Family is living in a 4-room HDB flat or smaller</li>
                        <li>
                            <input type="checkbox" name="check6" id="check6" checked />
                            Family has a gross per capita income (PCI) of $625/ month or less</li>
                        <li>
                            <input type="checkbox" name="check7" id="check7" checked /> 
                            Is not concurrently receiving School Pocket Money Fund from any other STSPMF disbursing agency/school or any other similar schemes except MOE Financial Assistance Scheme</li>
                        <li>
                            <input type="checkbox" name="check8" id="check8" checked /> 
                            Is not concurrently receiving School Pocket Money Fund from School or any other similar schemes except MOE Financial Assistance Scheme</li>
                        <li>
                            <input type="checkbox" name="check9" id="check9" checked /> 
                            Has not been a STSPMF beneficiary for more than 24 months for the whole schooling years of primary and secondary education or more than 48 months for the schooling years of post-secondary education. </li>
                        <li>
                            <input type="checkbox" name="check10" id="check10" checked />  
                            Student is 20 years or younger at point of application </li>
                    </ul>
                    <p><b>All completed STSPMF application forms must be attached with the relevant documents listed below:</b></p>
                    <ul className="ulnone">
                        <li>
                            <input type="checkbox" name="check1" id="check1" checked />   
                            Photocopy of student(s)’s NRIC / birth certificate </li>
                        <li>
                            <input type="checkbox" name="check2" id="check2" checked /> 
                            Photocopy of both parents’/ guardian’s NRIC / passport</li>
                    </ul>
                    <p className="red">STSPMF reserves the right to reject the application if any of the supporting documents is not submitted</p>
                    <br/>
                    <hr />
                </div>
                {/* Tab 2 Content */}
                <div className="col-md-12 print">
                    <br />
                    <p><b>Personal Details</b></p>
                    {/* Row 1 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Full Name</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Full_Name__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Gender</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Gender__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>ID Type</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.ID_Number__c}</p>
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
                                <p>{props.Nationality__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 3 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Date of Birth</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Date_of_Birth__c}</p>
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
                                <p>{props.Race__c}</p>
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
                                <p>{props.Marital_Status__c}</p>
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
                                <p>{props.Other_Race__c}</p>
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
                                <p>{props.Other_Marital_Status__c}</p>
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
                                <p>{props.Postal__c}</p>
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
                                <p>{props.Flat_Type__c}</p>
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
                                <p>{props.Street__c}</p>
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
                                <p>{props.Other_Flat_Type__c}</p>
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
                                <p>{props.Block__c}</p>
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
                                <p>{props.Country__c}</p>
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
                                <p>{props.Unit_Number__c}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <p><b>Personal Contact</b></p>
                    {/* Row 10 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Home Phone</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Home_Phone__c}</p>
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
                                <p>{props.Mobile_Phone__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Row 11 */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Email Address</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Email_Address__c}</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <hr />
                </div>
                {/* Tab 3 Content */}
                <div className="col-md-12">
                    <br />
                    <h4>Beneficiary List</h4>
                    {props.Ben.map((benData, benIdx) => {
                        <div>
                            <p><b> Beneficiary - {benIdx}</b></p>
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
                                        <p>{benData.data.Full_Name__c}</p>
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
                                        <p>{benData.data.ID_Number__c}</p>
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
                                        <p>{benData.data.Date_of_Birth__c}</p>
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
                                        <p>{benData.data.Race__c}</p>
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
                                        <p>{benData.data.Current_Level__c}</p>
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
                                        <p>{benData.data.Current_School__c}</p>
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
                                        <p>{benData.data.Stream__c}</p>
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
                                        <p>{benData.data.Applying_to__c}</p>
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
                                        <p>{benData.data.Email_Address__c}</p>
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
                                        <p>{benData.attachment.Name}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Graduating this year */}
                        </div>
                    })}
                    <br/>
                    <hr />
                </div>
                {/* Tab 4 Content */}
                <div className="col-md-12">
                    <br />
                    <h4>Household Member List</h4>
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
                                <p>{props.Full_Name__c}</p>
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
                                <p>{props.Full_Name__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant Date of Birth - Relationship to Applicant */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Date of Birth</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Date_of_Birth__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Relationship to Applicant</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Relationship_to_Applicant__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Main Applicant - Gross Monthly Income - Employment Status */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Gross Monthly Income</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Gross_Monthly_Income__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Employment Status</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Employment_Status__c}</p>
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
                                <p>{props.Occupation__c}</p>
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
                                <p>{props.Company__c}</p>
                            </div>
                        </div>
                    </div>
                    {/* Employment Start Date - Employment End Date */}
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Employment Start Date</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Employment_Start_Date__c}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="col-sm-5">
                                <p>Employment End Date</p>
                            </div>
                            <div className="col-sm-1">
                                :
                            </div>
                            <div className="col-sm-6">
                                <p>{props.Employment_End_Date__c}</p>
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
                                <p>{props.Hou[0].attachment.file1 ? props.Hou[0].attachment.file1.Name : ''}</p>
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
                                <p>{props.Hou[0].attachment.file2 ? props.Hou[0].attachment.file2.Name : ''}</p>
                            </div>
                        </div>
                    </div>
                    {props.Hou.map((houData, houIdx) => {
                        if (houIdx > 0) {
                            <div>
                                <br />
                                <p><b>Member - {houIdx}</b></p>
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
                                            <p>{houData.data.Full_Name__c}</p>
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
                                            <p>{houData.data.Full_Name__c}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Hou Date of Birth - Relationship to Applicant */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Date of Birth</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Date_of_Birth__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Relationship to Applicant</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Relationship_to_Applicant__c}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Hou - Gross Monthly Income - Employment Status */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Gross Monthly Income</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Gross_Monthly_Income__c}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Employment Status</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Employment_Status__c}</p>
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
                                            <p>{houData.data.Occupation__c ? houData.data.Occupation__c : ''}</p>
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
                                            <p>{houData.data.Company__c ? houData.data.Company__c : ''}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Employment Start Date - Employment End Date */}
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Employment Start Date</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Employment_Start_Date__c ? houData.data.Employment_Start_Date__c : ''}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-5">
                                            <p>Employment End Date</p>
                                        </div>
                                        <div className="col-sm-1">
                                            :
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{houData.data.Employment_End_Date__c ? houData.data.Employment_End_Date__c : ''}</p>
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
                                            <p>{houData.attachment.file1 ? houData.attachment.file1.Name : ''}</p>
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
                                            <p>{houData.attachment.file2 ? houData.attachment.file2.Name : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }   
                    })}
                    <br/>
                    <hr />
                </div>
                {/* Tab 5 Content */}
                <div className="col-md-12">
                    <div className="row">
                        <br />
                        <h4 className="">Declaration of consent</h4>
                        <ol>
                            <li> I, <span className="span_name"></span> {props.Full_Name__c}, I/C No <span className="span_nric"></span> {props.ID_Number__c}, declare that [my child/children/ward (s)] is/are currently NOT receiving The Straits Times School Pocket Money Fund (STSPMF) from any other STSPMF disbursing agency/school and have not applied for STSPMF at another disbursing agency/school.</li>
                            <li> 1.	I declare that {this.state.beneficiaries.toString()} is/are NOT receiving other similar monthly pocket money schemes excluding MOE FAS.</li>
                            <li> I acknowledge that for the purpose of facilitating my application for the STSPMF, that is administered by the STSPMF through disbursing agencies and schools,
                                <ol className="alphabet">
                                    <li> any and all agencies and schools that have any of my prior financial assistance or social assistance records may share the relevant information with STSPMF.</li>
                                    <li> that the record of this application, if approved, may be shared with STSPMF Trustees, the school and any agency or persons authorised by The Straits Times School Pocket Money Fund for the purpose of rendering me or assessing my eligibility for financial or other assistance in future occasions; or for research studies in which I, as a specific individual, shall not be identified; or for any other purpose prescribed or permitted under Singapore law. </li>
                                </ol>
                            </li>
                            {/* </p> */}
                            <li> I acknowledge that the information I have provided is accurate. I understand that [my children / my ward(s)] data will be stored in the electronic Case Management System (and in future, any replacement system developed by STSPMF) and consent for the data to be shared with STSPMF and across other agencies for analysis and enhancement of service delivery. 
                                </li>
                            <li> I am aware that the <span className="red">disbursing agency and/or STSPMF </span>has the right to recover in full the STSPMF that was given to me, if I have provided inaccurate information, or withheld any relevant information from the school.</li>
                            <li> I am aware that the STSPMF assistance is given for the benefit of [children/ ward(s)], for use as pocket money in school.
                                </li>
                            
                        </ol>
                    </div>
                    <div className="row">
                        <h4 className="">MEDIA COVERAGE </h4>
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
                        <button className="btn download" onClick={this.generateFormPdf}> Download File </button>
                    </center>
                </div>
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