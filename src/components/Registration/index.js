import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
        getSalesforceToken,
        getPostalCodeRecord,
        getPersonField,
        getPersonFields,
        getSchoolList,
        retrieveObject,
        saveObject,
        updateObject,
        getApplicationField,
        getRecordType
    } from '../../actions/salesforces';
import { getCurrentDate, validation, getBase64 } from '../../utils/common';
import moment from 'moment';
import Stepper from './stepper';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';
import Tab5 from './tab5';
import $ from 'jquery';
import swal from 'sweetalert';
import Iframe from './iframe';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { error } from '@firebase/database/dist/esm/src/core/util/util';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: [{
            title: 'Start',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 1)
            }
            }, {
            title: 'Application Profile ',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 2)
            }
            }, {
            title: 'Beneficiaries List',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 3)
            }
            }, {
            title: 'Other household members',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 4)
            }
        }, {
            title: 'Agreement',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 5)
            }
            }],
            currentStep: 0,
            tabIndex: 0,
            RecordType: {Household_Member : "0125D0000008awbQAA", Beneficiary: "0125D0000008awgQAA"},
            employStatusList: [],
            relationList: [],
            isValidMainEmail: true,
            isValidBenEmail: ['true'],
            isValidBenNric: ['', ],
            isValidHouNric: ['',],
            //data
            check1: '',
            check2: '',
            check3: '',
            check4: '',
            check5: '',
            check6: '',
            check7: '',
            check8: '',
            check9: '',
            check10: '',
            // Application
            Alcoholism__c: false,
            Applicant__c: '',
            Application_Type__c: '',
            Approved_Bene__c: '',
            Calculated_per_capita_income__c: '',
            Cancelled_Bene__c: '',
            Chronic_Illness__c: false,
            City__c: '',
            Country__c: '',
            Cultural_or_personal_belief__c: '',
            Date_of_Application__c: getCurrentDate(),
            Declaration_Completed__c: '',
            Disability__c: false,
            Drug_Addiction__c: false,
            Fail_Bene_Requirement__c: '',
            Fail_Eligibility__c: '',
            Fail_Flat_Type__c: '',
            Fail_Per_Cap_Income__c: '',
            Flat_Type__c: '',
            Gambling_Addiction__c: '',
            Home_Ownership__c: '',
            Low_Education__c: '',
            Media_Coverage_consent__c: '',
            No_of_Bene__c: '',
            No_of_dependent_youth_children__c: '',
            Other_Reason__c: '',
            Other_Reason_Description__c: '',
            Other_Source_of_Income__c: '',
            Other_Source_of_Income_Amount__c: '',
            Postal__c: '',
            Reason_s_for_Single_No_income_earner__c: '',
            Related_Account__c: '',
            Social_Visit_Pass__c: '',
            Source_of_Application__c: '',
            Street__c: '',
            Temporarily_unfit_for_work__c: '',
            Total_income_earners__c: '',
            Total_Monthly_Gross_Income__c: '',
            Total_number_of_household_members__c: '',
            Unit_Number__c: '',
            // Person
            Applying_to__c: '',
            Applying_to_Education_Level__c: '',
            Applying_to_Level_Year__c: '',
            City__c: '',
            Company__c: '',
            Country__c: 'Singapore',
            Current_Level__c: '',
            Current_School__c: '',
            Date_of_Birth__c: '2011-01-10',
            Email_Address__c: '',
            Employment_End_Date__c: '2011-01-10',
            Employment_Start_Date__c: '2011-01-10',
            Employment_Status__c: '',
            Fail_Standard_Criteria__c: '',	
            Fail_Flat_Type__c: '',
            Full_Name__c: '',
            Gender__c: 'male',
            Home_Phone__c: '',
            ID_Number__c: '123456',
            ID_Type__c: 'NRIC',
            Main_Applicant__c: true,
            Marital_Status__c: 'Single',
            Mobile_Phone__c: '',
            Monthly_Gross_Income__c: '',
            Nationality__c: 'Singaporean',
            Race__c: '',
            Street__c: '',
            Unit_Number__c: '',
            Occupation__c: '',	
            Other_Marital_Status__c: '',
            Other_Nationality__c: '',
            Other_Race__c: '',
            Other_Religion__c: '',	
            Race__c: '',
            // Referred_Date__c
            // Referred_From__c
            // Referring_Reason__c
            // Related_Contact__c	
            Relationship_to_Applicant__c: 'Self',	
            Religion__c: '',
            Remarks__c: '',
            Stream__c: '',
            Ben: [{data:{}, attachment:{}}],
            BenAttachments:[],
            Hou: [{attachment:{}}],
            HouAttachments: [],
            isLoading: true,
        };
        this.onClickNext                = this.onClickNext.bind(this);
        this.onClickPrev                = this.onClickPrev.bind(this);
        this.submitApp                  = this.submitApp.bind(this);
        this.changeState                = this.changeState.bind(this);
        this.onSelect                   = this.onSelect.bind(this);
        this.save                       = this.save.bind(this);
        this.update                     = this.update.bind(this);
        this.retrieve                   = this.retrieve.bind(this);
        this.generatePdf                = this.generatePdf.bind(this);
        
    }

    componentDidMount() {
        const a = ['as', 'sds']
        this.props.getSalesforceToken(() => {
            this.props.getPostalCodeRecord();
            this.props.getSchoolList();
        }).then(() => {
            this.setState({ isLoading: false })
        });
        this.retrieve('Person__c/describe').then((json)=>{
            const fields = json.fields
            fields.sort((a, b) => {
                if (a.label.toUpperCase() < b.label.toUpperCase()) return -1;
                if (a.label.toUpperCase() > b.label.toUpperCase()) return 1;
                return 0;
            });
            console.log('fields', fields)
            fields.map((item) => {
                if (item.name == "Employment_Status__c") {
                    this.state.employStatusList = item.picklistValues                    
                }
                if (item.name == "Relationship_to_Applicant__c") {
                    this.state.relationList = item.picklistValues
                }
            });
        })
       this.retrieve('Attachment/describe').then((json)=>{console.log('ini', json)})
       getRecordType();
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", function (event) {
            console.log(event);
        })
    }
    
    onClickNext() {
        const { steps, currentStep , tabIndex} = this.state;
        if (currentStep > 0) {
            const isValid = validation(currentStep+1, this.state);
            let validNric = null;
            const validFormat = currentStep == 1 ? this.state.isValidMainEmail : !this.state.isValidBenEmail.includes("false");

            if(currentStep == 1) {
                validNric = this.state.isValidMainNric
             }
            if(currentStep == 2) {
                validNric = !this.state.isValidBenNric.includes("false")
             }
            if (currentStep == 3) {
                validNric = !this.state.isValidHouNric.includes("false")
                console.log('4', validNric)
            }

            if (!validFormat) {
                console.log('false')
                swal('Invalid Format Email')
            }
            if (!validNric){
                swal('Invalid Format NRIC/FIN')
            }
            if(!isValid){
                swal('cannot move to next step, please fill all required fields');
            }
            if(validNric && validFormat && isValid){
                this.setState({
                    currentStep: currentStep + 1,
                    tabIndex: tabIndex + 1
                });
            }
        } else {
            this.setState({
                currentStep: currentStep + 1,
                tabIndex: tabIndex + 1
            });
        }
        
        
        
    }

    onClickPrev() {
        const { steps, currentStep, tabIndex } = this.state;
        this.setState({
            currentStep: currentStep - 1,
            tabIndex: tabIndex - 1
        });
    }

    onSelect() {
        
    }

    changeState(name, val){
        this.setState({
            [name]: val
        });
        //console.log(this.state[name])
    }
    retrieve(sobjects) {
        const SF_VERSION = 'v20.0';
        const salesforceToken = this.props.salesforce.token
        const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}`;
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            timeout: 5000,
        };
        return fetch(fullUrl, fetchConfig).then((response) => response.json())
    }
    save(sobjects, data) {
        const SF_VERSION = 'v20.0';
        const salesforceToken = this.props.salesforce.token
        const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}/`;
        const fetchConfig = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data),
            timeout: 5000,
        };
        return fetch(fullUrl, fetchConfig).then((response) => response.json());
    }
    update(sobjects, id, data) {
        const SF_VERSION = 'v20.0';
        const salesforceToken = this.props.salesforce.token
        const fullUrl = `${salesforceToken.instanceUrl}/services/data/${SF_VERSION}/sobjects/${sobjects}/${id}`;
        const fetchConfig = {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${salesforceToken.accessToken}`,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data),
            timeout: 5000,
        };
        return fetch(fullUrl, fetchConfig).then((response) => response.json());
    }
    generatePdf(){
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        var content = document.getElementById("PrintedForm").innerHTML;
        pri.document.open();
        pri.document.write('<link ret=stylesheet src="../../assets/css/document.css" type="text/css" />')
        pri.document.write(content);
        pri.document.close();
        pri.focus();
        pri.print();
    }
    submitApp(){
        this.generatePdf()
        var personData = {
            Applying_to__c: this.state.Applying_to__c,
            Applying_to_Education_Level__c: this.state.Applying_to_Education_Level__c,
            Applying_to_Level_Year__c: this.state.Applying_to_Level_Year__c,
            Company__c: this.state.Company__c,
            Current_Level__c: this.state.Current_Level__c,
            Current_School__c: this.state.Current_Level__c,
            Date_of_Birth__c: this.state.Date_of_Birth__c,
            Email_Address__c: this.state.Email_Address__c,
            Employment_End_Date__c: this.state.Employment_End_Date__c,
            Employment_Start_Date__c: this.state.Employment_Start_Date__c,
            Employment_Status__c: this.state.Employment_Status__c,
            Fail_Standard_Criteria__c: this.state.Fail_Standard_Criteria__c,	
            Full_Name__c: this.state.Full_Name__c,
            Gender__c: this.state.Gender__c,
            Home_Phone__c: this.state.Home_Phone__c,
            ID_Number__c: this.state.ID_Number__c,
            ID_Type__c: this.state.ID_Type__c,
            Main_Applicant__c: true,
            Marital_Status__c: this.state.Marital_Status__c,
            Mobile_Phone__c: this.state.Mobile_Phone__c,
            Monthly_Gross_Income__c: this.state.Monthly_Gross_Income__c,
            Nationality__c: this.state.Nationality__c,
            Occupation__c: this.state.Occupation__c,	
            Other_Marital_Status__c: this.state.Other_Marital_Status__c,
            Other_Nationality__c: this.state.Other_Nationality__c,
            Other_Race__c: this.state.Other_Race__c,
            Other_Religion__c: this.state.Other_Religion__c,	
            Race__c: this.state.Race__c,
            Relationship_to_Applicant__c: this.state.Relationship_to_Applicant__c,	
            Religion__c: this.state.Religion__c,
            Remarks__c: this.state.Remarks__c,
            Stream__c: this.state.Stream__c,
        };
        const applicationData = {
            Alcoholism__c: this.state.Alcoholism__c,
            Applicant__c: this.state.Applicant__c,
            Application_Status__c: this.state.Application_Status__c,
            Application_Type__c: this.state.Application_Type__c,
            City__c: this.state.City__c,
            Country__c: this.state.Country__c,
            Date_of_Application__c: this.state.Date_of_Application__c,
            Disability__c: this.state.Disability__c,
            Fail_Flat_Type__c: this.state.Fail_Flat_Type__c,
            Fail_Per_Cap_Income__c: true,
            Flat_Type__c: this.state.Fail_Type_c,
            Full_Name__c: this.state.Full_Name__c,
            Home_Ownership__c: this.state.Home_Ownership__c,
            No_of_dependent_youth_children__c: this.state.No_of_dependent_youth_children__c,
            Other_Source_of_Income__c: this.state.Other_Source_of_Income__c,
            Other_Source_of_Income_Amount__c: this.state.Other_Source_of_Income_Amount__c,
            Postal__c: this.state.Postal__c,
            Reason_s_for_Single_No_income_earner__c: this.state.Reason_s_for_Single_No_income_earner__c,
            Related_Account__c: this.state.Related_Account__c,
            Social_Visit_Pass__c: this.Social_Visit_Pass__c,
            Source_of_Application__c: this.state.Source_of_Application__c,
            Street__c: this.state.Street__c,
            Unit_Number__c: this.state.Unit_Number__c,
        }
        const salesforceToken = this.props.salesforce.token;
        saveObject('Application__c', applicationData, salesforceToken).then((json1) => {
            const applicationId = json1.id
            personData.Application__c = applicationId
            console.log('personData', personData)
            console.log('appRes', json1)
            saveObject('Person__c', personData, salesforceToken).then((json2) => {
                console.log('updateRes', json2)
                const personId = json2.id
                const dataToUpdate = {Applicant__c: personId}
                console.log('dataappUpdate', dataToUpdate)
                updateObject('Application__c', applicationId, dataToUpdate, salesforceToken).then(
                    (json3) => {
                        console.log(json3)
                })
                if (this.state.Hou[0].attachment.file1 !== undefined) {
                    console.log(personId)
                    this.state.Hou[0].attachment.file1.parentId = personId
                        this.save('Attachment', this.state.Hou[0].attachment.file1).then((resAttach)=>{
                            console.log('personAttachfile1', resAttach)
                        }).catch((err) => { alert(err) })
                }
                if (this.state.Hou[0].attachment.file2 !== undefined) {
                    this.state.Hou[0].attachment.file2.parentId = personId
                        this.save('Attachment', this.state.Hou[0].attachment.file2).then((resAttach)=>{
                            console.log('personAttachfile2', resAttach)
                        }).catch((err) => { alert(err) })
                }
            }); /* end Of save Main Applicant */
            /*  save BenData */
            this.state.Ben.map((benData) => {
                benData.data.Application__c = applicationId
                benData.data.RecordTypeId = '0125D0000008awgQAA'
                this.save('Person__c', benData.data).then((resBen)=>{
                    const benId = resBen.id
                    if (benData.attachment.Name !== undefined){
                        benData.attachment.parentId = benId
                        console.log('benesave', resBen)
                        this.save('Attachment', benData.attachment).then((resBenAttach)=>{
                            console.log('beneattach', resBenAttach)
                        }).catch((err) => { alert(err) })
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }); /* end of save BenData */
            /* save HouData */
            this.state.Hou.map((houData, idx) => {
                if(idx !== 0){
                    console.log(houData);
                    houData.data.Application__c = applicationId
                    this.save('Person__c', houData.data).then((resHou)=>{
                        const personHouId = resHou.id
                        if (houData.attachment.file1 !== undefined) {
                            houData.attachment.file1.parentId = personHouId
                            this.save('Attachment', houData.attachment.file1).then((resHouAttach)=>{
                                console.log('houattach', resHouAttach)
                            }).catch((err) => { alert(err) })
                        }
                        if (houData.attachment.file2 !== undefined) {
                            houData.attachment.file2.parentId = personHouId
                            this.save('Attachment', houData.attachment.file2).then((resHouAttach)=>{
                                console.log('houattach', resHouAttach)
                            }).catch((err) => { alert(err) })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }    
            }); /*  end of save HouData */
        }); /* end of submit to SF process */
        return true;
    }

    render() {
        const { steps, currentStep } = this.state;
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };
        let buttonprev = null;
        let buttonnext = null;
        if (currentStep > 0) {
            buttonprev = <button onClick={ this.onClickPrev } className="btn btn-warning btn-100">Prev</button>;
          } else {
            buttonprev = '';
          }
          if (currentStep == 4) {
            buttonnext = '';
          } else {
            if(this.state.check1 == 'on' && this.state.check2 == 'on' &&  this.state.check4 == 'on' &&  this.state.check5 == 'on' &&  this.state.check6 == 'on' &&  this.state.check7 == 'on' &&  this.state.check8 == 'on' &&  this.state.check9 == 'on' &&  this.state.check10 == 'on' ){
                buttonnext = <button onClick={ this.onClickNext } className="btn btn-success btn-100">Next</button>;
            }
            else{
                buttonnext = <button onClick={ this.onClickNext } className="btn btn-success btn-100" disabled>Next</button>;
            }
          }
       return ( 
        <div className="container body">
            <div className="col-md-12" id="logoHeader">
                <div className="col-md-3">
                <img src={require('../../assets/img/spmf_logo.jpg')} width="150px"/>
                </div>
                <div className="col-md-9 header-title">
                    <br /><br /><br /><br />
                    <h4>STSPMF Application Form</h4>
                </div>
            </div>
            {this.state.isLoading ? <div><i className="fa text-center fa-spinner fa-spin fa-3x fa-fw" /></div> :
                <div className="" id="AppForm">
                    <Stepper steps={ steps } activeStep={ currentStep } />
                    
                    <Tabs selectedIndex={this.state.tabIndex} forceRenderTabPanel={true} onSelect={this.onSelect}>
                    <TabList style={{ display: "none" }}>
                        <Tab>Title 1</Tab>
                        <Tab>Title 2</Tab>
                        <Tab>Title 3</Tab>
                        <Tab>Title 4</Tab>
                        <Tab>Title 5</Tab>
                    </TabList>
                    <div id="PrintedForm">
                        <TabPanel>
                            <Tab1 
                                changeState={this.changeState}
                                data={this.state}
                                />
                        </TabPanel>
                        <TabPanel>
                            <Tab2 
                                changeState={this.changeState}
                                data={this.state}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Tab3 
                                changeState={this.changeState}
                                data={this.state}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Tab4 
                                changeState={this.changeState}
                                data={this.state}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Tab5 submitApp={this.submitApp}/>
                        </TabPanel>
                    </div>
                    </Tabs>
                
                    <br />
                    <div className="text-center">
                        {buttonprev}
                        {buttonnext}
                    </div>
                </div>
            }
            <iframe id="ifmcontentstoprint" style={{height: "0px", width: "0px", position: "absolute", pageBreakAfter:"always"}}></iframe>
        </div>
       );
    }
 }

Registration.propTypes = {
    title: PropTypes.string,
};
Registration.defaultProps = {
    title: 'Hello World',
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getSalesforceToken,
        getPostalCodeRecord,
        getPersonField,
        getSchoolList,
        getApplicationField,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(Registration);

