import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/side_menu';
import {
    getApplicationDetail,
    getApplicationBeneList,
    getApplicationHouList,
    getApplicationDetail2 } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ApplicationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appDetail: [],
            appDetail2: [],
            appBeneList: [],
            appHouList: [],
        };
    }
    componentDidMount() {
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
            console.log('appDetail2', json);
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
    render() {
        console.log('appDetail2', this.state.appDetail2);
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Application Detail </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page col-md-9">
                            <div className="x_panel">
                                <div className="x_title">
                                    Personal Details
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Application Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Name : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_Name__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant__r.Name : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant ID Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_ID_Type__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant ID Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_ID__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant Marital Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_Marital_Status__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Applicant Race</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_Race__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-2 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Applicant_PDPA__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-10 text-content">
                                                Applicant PDPA
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Date of Application</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Date_of_Application__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Application Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Application_Type__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Application Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Application_Status__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Source of Application</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Source_of_Application__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Fail_Flat_Type__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Fail Flat Type
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Fail_Per_Cap_Income__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                &nbsp;Fail Per Cap Income
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Fail_Bene_Requirement__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Fail Bene Requirement
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Status
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Total Number of HouseHold Member</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Total_number_of_household_members__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>No of Dependent youth/children</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].No_of_dependent_youth_children__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>No of Bene</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].No_of_Bene__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Completed Bene</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Approved_Bene__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Reason for not having Income Earner/Having one Income Earner
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Alcoholism__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Alcoholism
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Chronic_Illness__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Chronic Illness
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Cultural_or_personal_belief__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Cultural or Personal Belief 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Disability__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Disability 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Low_Education__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Low Education
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Gambling_Addiction__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Gambling Addiction
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Temporarily_unfit_for_work__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Temporarily Unfit for Work 
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-1 checkContainer">
                                                <input
                                                    type="checkbox"
                                                    className="form-control"
                                                    checked={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Other_Reason__c : ''}
                                                    readOnly="true"
                                                />
                                            </div>
                                            <div className="col-sm-11 text-content">
                                                Other Reason 
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Other Reason Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail2.length > 0 ? this.state.appDetail2[0].Other_Reason_Description__c : ''}
                                                disabled="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="x_title">
                                    Income Detail
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
                        <div className="col-md-3">
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
