import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSalesforceToken, getPostalCodeRecord, getPersonField, getPersonFields, getSchoolList } from '../../actions/salesforces';
import Stepper from './stepper';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';
import Tab5 from './tab5';
import $ from 'jquery';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
            Full_Name__c: '',
            ID_Type__c  : 'NRIC',
            Marital_Status__c: 'Single',
            Date_of_Birth__c: '',
            Gender__c: 'Male',
            Nationality__c: 'Singaporean',
            Race__c: '',
            Street__c: '',
            Unit_Number__c: '',
            City__c: '',
            Fail_Flat_Type__c: '',
            Country__c: 'Singapore',
            Home_Phone__c: '',
            Mobile_Phone__c: '',
            Email_Address__c: '',
            Ben: Array(),
            Hou: Array()
        };
        this.onClickNext                = this.onClickNext.bind(this);
        this.onClickPrev                = this.onClickPrev.bind(this);
        this.submitApp                  = this.submitApp.bind(this);
        this.changeState                = this.changeState.bind(this);
        this.onSelect                   = this.onSelect.bind(this);
        
    }

    componentDidMount() {
        this.props.getSalesforceToken();
        this.props.getPostalCodeRecord();
        this.props.getSchoolList();
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", function (event) {
            console.log(event);
        })
    }
    
    onClickNext() {
        const tkn = localStorage.getItem('tokensf')
        const { steps, currentStep , tabIndex} = this.state;
        this.setState({
            currentStep: currentStep + 1,
            tabIndex: tabIndex + 1
        });
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

    submitApp(){
        var data = {
            Full_Name__c: this.state.Full_Name__c,
            ID_Number__c  : this.state.ID_Number__c,
            ID_Type__c  : this.state.ID_Type__c,
            Marital_Status__c: this.state.Marital_Status__c,
            Date_of_Birth__c: this.state.Date_of_Birth__c,
            Gender__c: this.state.Gender__c,
            Nationality__c: this.state.Nationality__c,
            Race__c: this.state.Race__c,
            Street__c: this.state.Street__c,
            Unit_Number__c: this.state.Unit_Number__c,
            City__c: this.state.City__c,
            Fail_Flat_Type__c: this.state.Fail_Flat_Type__c,
            Country__c: this.state.Country__c,
            Home_Phone__c: this.state.Home_Phone__c,
            Mobile_Phone__c: this.state.Mobile_Phone__c,
            Email_Address__c: this.state.Email_Address__c,
            Ben: this.state.Ben,
            Hou: this.state.Hou
        };
        return fetch('https://us-central1-fbfunctions-5b218.cloudfunctions.net/api1/save',
        {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            body: JSON.stringify(data)
        },
        })
        .then((response) => response.json())
        .then((responseData) => {
        console.warn(responseData);
        return responseData;
        })
        .catch(error => console.warn(error));
        //console.log(data);
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
                </Tabs>
                <br />
                <div className="text-center">
                    {buttonprev}
                    {buttonnext}
                </div>
            </div>
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
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(Registration);

