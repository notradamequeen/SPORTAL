import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/SideMenu';
import {
    getApplicationDetail,
    getApplicationBeneList,
    getApplicationHouList,
    getApplicationDetail2,
    submitVerifyBene } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ApplicationDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appDetail: [],
            appDetail2: [],
            appBeneList: [],
            appHouList: [],
        };
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        if (this.props.user.loggedInUser == null) {
            this.context.history.push('/login')
        }
        getApplicationDetail(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log('appDetail', json.records[0]);
            this.setState({ appDetail: json.records });
        });
        getApplicationDetail2(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log('appDetail', json.records[0]);
            this.setState({ appDetail2: json.records });
        });
        getApplicationBeneList(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            this.setState({ appBeneList: json.records });
        });
        getApplicationHouList(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log('hou', json);
            this.setState({ appHouList: json.records });
        });
    }
    submit() {
        const datas = [];
        this.appBeneList.map((Benitem) => {
            const data = {
                Id: Benitem.Id,
                Application_Status__c: Benitem.Application_Status__c == 'Rejected By Partner' ? Benitem.Application_Status__c : 'Submit by Partner',
            };
            datas.push(data);
        });
        submitVerifyBene(
            this.props.user.siteToken.hash,
            datas,
        ).then((response) => {
            console.log('submit', response)
            response.json();
        });
    }
    render() {
        if (this.props.user.loggedInUser == null) {
            this.context.history.push('/login')
        }
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Main Applicant </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page col-md-8">
                            <div className="x_panel">
                                <div className="x_title">
                                    Personal Details
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant_Name__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.ID_Type__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.ID_Number__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date Of Birth</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Date_of_Birth__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Marital Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Marital_Status__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Marital Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Marital_Status__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Gender__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Nationality__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Nationality</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Nationality__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Race</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Race__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Race</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Race__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Address
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Street Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Street__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Street Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Unit_Number__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].City__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Type of Flat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Flat_Type__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Type of Flat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Other_Flat_Type__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Country__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Personal Contact
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Home Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Home_Phone__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Mobile_Phone__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Email_Address__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Household Member Information
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Relationship to Applicant</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Relationship_to_Applicant__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Company</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Company__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Occupation</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Occupation__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Employment Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Employment_Status__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Employment Start Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Employment_Start_Date__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Monthly Gross Income</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Monthly_Gross_Income__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h4>Beneficiaries </h4>
                                        <div className="clearfix" />
                                    </div>
                                    {this.state.appBeneList.map(appBenItem => (
                                        <div className="x_content" style={{ display: 'block' }} >
                                            <div className="col-xs-2">
                                                <div className="avatar ben">
                                                    <Link
                                                        to={{ pathname: `/portal/beneficiary/${appBenItem.Name}` }}
                                                        params={{ personId: appBenItem.Name }}
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src={require('../../../assets/img/face-1.jpg')}
                                                            alt="Circle"
                                                            className="img-circle img-no-padding img-responsive"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-xs-1">
                                                { appBenItem.Application_Status__c === 'Rejected by Partner' ?
                                                    <h3 style={{ color: 'red' }}><i className="fa fa-times" /></h3> : ''
                                                }
                                                { appBenItem.Application_Status__c === 'Verified by Partner' ?
                                                    <h3 style={{ color: 'green' }}><i className="fa fa-check" /></h3> : ''
                                                }

                                            </div>
                                            <div className="col-xs-6">
                                                <label> {appBenItem.Full_Name__c} </label>
                                                <p> {appBenItem.Applying_to__r.Name}</p>
                                            </div>
                                            <div className="col-xs-3">
                                                <button className="btn btn-small btn-danger">Terminate</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="row">
                                <div className="x_panel">
                                    <div className="x_title">
                                        <h4>Other HouseHold Member </h4>
                                        <div className="clearfix" />
                                    </div>
                                    {this.state.appHouList.map(appHouItem => (
                                        !appHouItem.Main_Applicant__c ?
                                            <div className="x_content" style={{ display: 'block' }} >
                                                <div className="col-xs-3">
                                                    <div className="avatar ben">
                                                        <Link
                                                            to={{ pathname: `/portal/beneficiary/${appHouItem.Name}` }}
                                                            params={{ personId: appHouItem.Name }}
                                                        >
                                                            <img
                                                                src={require('../../../assets/img/face-0.jpg')}
                                                                alt="Circle"
                                                                className="img-circle img-no-padding img-responsive"
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-xs-6">
                                                    <label> {appHouItem.Full_Name__c} </label>
                                                    <p> {appHouItem.Relationship_to_Applicant__c}</p>
                                                </div>
                                                <div className="col-xs-3">
                                                    <btn className="btn btn-sm btn-success btn-icon">
                                                        <i className="fa fa-envelope" />
                                                    </btn>
                                                </div>
                                            </div>
                                            : ''
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApplicationDetail.propTypes = {
    user: PropTypes.object.isRequired,
    getApplicationDetail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getApplicationDetail,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);
