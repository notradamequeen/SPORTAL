import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BeneficaryMember from './BeneficaryMember';
import Attachment from './Attachment';
import { updateApplication, getApplicationPersonList, getAllAttachment } from './actions';

import {
    getApplicationDetail,
    submitVerifyBene,
} from '../services';

class ApplicationDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            appDetail: null,
            appBeneList: [],
            appHouList: [],
            attachmentList: [],
            edit: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onApprove = this.onApprove.bind(this);
        this.onReject = this.onReject.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onFormChanged = this.onFormChanged.bind(this);
        this.save = updateApplication.bind(this);
    }
    async componentWillMount() {
        try {
            this.setState({ loading: true });
            let appDetail = await getApplicationDetail(this.props.match.params.applicantionId, this.props.user.siteToken.hash);
            appDetail = await appDetail.json();
            const appBeneList = await getApplicationPersonList(
                this.props.match.params.applicantionId, this.props.user.loggedInUser.AccountId,
                'Beneficiary', this.props.user.siteToken.hash,
            );
            
            const houseHoldMember = await getApplicationPersonList(
                this.props.match.params.applicantionId, this.props.user.loggedInUser.AccountId,
                'Household Member', this.props.user.siteToken.hash,
            );
            const beneficaryIds = [];
            if (appBeneList.records) appBeneList.records.map(beneList => beneficaryIds.push(beneList.Id));
            if (houseHoldMember.records) houseHoldMember.records.map(eachMember => beneficaryIds.push(eachMember.Id));
            const attachmentList = await getAllAttachment(beneficaryIds, this.props.user.siteToken.hash);
            this.setState({
                appDetail: appDetail.records[0] || null,
                appBeneList: appBeneList.records || [],
                appHouList: houseHoldMember.records || [],
                attachmentList: attachmentList.records || [],
                loading: false,
            });
        } catch (error) {
            swal({
                text: error.toString(),
                title: 'An Error Occured',
            });

            this.setState({ loading: false });
        }
    }
    onSubmit() {
        if (this.state.loading === true) return;
        const datas = [];
        this.state.appBeneList.map((Benitem) => {
            const data = {
                Id: Benitem.Id,
                Application_Status__c: Benitem.Application_Status__c == 'Rejected By Partner' ? Benitem.Application_Status__c : 'Submitted by Partner',
                No_of_Receipts_Approved__c: 0,
                Payout_Start__c: new Date(),
                Payout_End__c: new Date(),
            };
            datas.push(data);
        });
        this.setState({ loading: true });
        submitVerifyBene(
            datas,
            this.props.user.siteToken.hash,
        ).then(response => response.json())
            .then((res) => {
                if (res.status === 200) {
                    swal({
                        title: 'Application has been submitted',
                        text: 'This application has been submitted. Approver will process this application',
                    });
                    this.componentWillMount();
                } else {
                    swal({
                        text: res.message,
                        title: 'An error occured when submitting application',
                    });
                }
            }).catch(err => swal(err));
    }
    onApprove() {
        const datas = [];
        this.state.appBeneList.map((Benitem) => {
            const data = {
                Id: Benitem.Id,
                Application_Status__c: Benitem.Application_Status__c == 'Rejected By Partner' ? Benitem.Application_Status__c : 'Approved by Partner',
            };
            datas.push(data);
        });
        submitVerifyBene(
            datas,
            this.props.user.siteToken.hash,
        ).then(response => response.json())
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                } else {
                    swal('Error!! Please Contact Administrator');
                }
            });
    }
    onReject() {
        const datas = [];
        this.state.appBeneList.map((Benitem) => {
            const data = {
                Id: Benitem.Id,
                Application_Status__c: 'Rejected By Partner',
            };
            datas.push(data);
        });
        submitVerifyBene(
            datas,
            this.props.user.siteToken.hash,
        ).then(response => response.json())
            .then((res) => {
                if (res.status === 200) {
                    this.componentWillMount();
                } else {
                    swal('Error!! Please Contact Administrator');
                }
            });
    }
    onBack() {
        this.props.history.push('/portal/applications');
    }
    onFormChanged(attributeName, value) {
        this.setState({
            appDetail: {
                ...this.state.appDetail,
                [attributeName]: value,
            },
        });
    }

    render() {
        const { appDetail } = this.state;
        return (
            <div id="applicationDetail" className="row">
                <div className="col-lg-9 col-sm-12 col-md-9">
                    <div className="card">
                        <div className="col-md-12" style={{ textAlign: 'center', marginBottom: 30 }}>
                            {this.props.user.loggedInUser.Partner_Authority__c === 'Approver' ?
                                <div>
                                    <button className="btn btn-small btn-orange" onClick={this.onBack}>Back</button>
                                </div>
                                :
                                <div className="btn-group">
                                    <button className="btn btn-default" onClick={this.onBack}>Back</button>
                                    {/*
                                        !this.state.edit ? <button className="btn btn-fill btn-primary" onClick={() => this.setState({ edit: true })}>Edit</button>  :
                                            [
                                                <button className="btn btn-fill btn-primary" onClick={() => this.setState({ edit: false })}>Cancel</button>,
                                                <button className="btn btn-fill btn-success" onClick={this.save}>Save</button>
                                            ]
                                    
                                        <button className="btn btn-fill btn-info" onClick={this.onSubmit}>Submit</button>
                                    */}
                                </div>
                            }
                        </div>
                        <div className="clearfix" />
                        <p style={{ textAlign: 'center' }}>
                            {this.state.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                        </p>
                        <h4>Application Detail</h4>
                        <hr />
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Application No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Name : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Applicant Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Applicant_Name__c : ''}
                                    disabled={!this.state.edit}
                                    onChange={e => this.onFormChanged('Applicant_Name__c', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Applicant ID Type</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Applicant_ID_Type__c : ''}
                                    disabled={!this.state.edit}
                                    onChange={e => this.onFormChanged('Applicant_ID_Type__c', e.target.value)}
                                >
                                    <option value="NRIC">NRIC</option>
                                    <option value="Passport">Passport</option>
                                    <option value="FIN">FIN</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Applicant ID Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Applicant_ID__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Applicant Marital Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Applicant_Marital_Status__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Applicant Race</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Applicant_Race__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Applicant_PDPA__c : ''}
                                        readOnly={!this.state.edit}
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
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
                                    value={appDetail ? appDetail.Date_of_Application__c : ''}
                                    disabled="true"
                                />
                            </div>
                            <div className="form-group">
                                <label>Application Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Application_Type__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Application Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Application_Status__c : ''}
                                    disabled="true"
                                />
                            </div>
                            <div className="form-group">
                                <label>Source of Application</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Source_of_Application__c : ''}
                                    disabled="true"
                                />
                            </div>
                            <div className="row">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Fail_Flat_Type__c : ''}
                                        readOnly={!this.state.edit}
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
                                    Fail Flat Type
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Fail_Per_Cap_Income__c : ''}
                                        readOnly="true"
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
                                    &nbsp;Fail Per Cap Income
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Fail_Bene_Requirement__c : ''}
                                        readOnly={!this.state.edit}
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
                                    &nbsp;Fail Bene Requirement
                                </div>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <h4>Status</h4>
                        <hr />
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Total Number of HouseHold Member</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Total_number_of_household_members__c : ''}
                                    disabled="true"
                                />
                            </div>
                            <div className="form-group">
                                <label>No of Dependent youth/children</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.No_of_dependent_youth_children__c : ''}
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
                                    value={appDetail ? appDetail.No_of_Bene__c : ''}
                                    disabled="true"
                                />
                            </div>
                            <div className="form-group">
                                <label>Completed Bene</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Approved_Bene__c : ''}
                                    disabled="true"
                                />
                            </div>
                        </div>
                        <div className="x_title">
                            <p>Reason for not having Income Earner/Having one Income Earner</p>
                            <div className="clearfix" />
                        </div>
                        <div className="x_content" style={{ display: 'block' }} >
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            checked={appDetail ? appDetail.Alcoholism__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Alcoholism
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            value={appDetail ? appDetail.Chronic_Illness__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Chronic Illness
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            value={appDetail ? appDetail.Cultural_or_personal_belief__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Cultural or Personal Belief
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            checked={appDetail ? appDetail.Disability__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Disability
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            checked={appDetail ? appDetail.Low_Education__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Low Education
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            value={appDetail ? appDetail.Gambling_Addiction__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Gambling Addiction
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            checked={appDetail ? appDetail.Temporarily_unfit_for_work__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Temporarily Unfit for Work
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3 checkContainer">
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            value={appDetail ? appDetail.Other_Reason__c : ''}
                                            readOnly="true"
                                        />
                                    </div>
                                    <div className="col-sm-9 text-content">
                                        &nbsp;Other Reason
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Other Reason Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={appDetail ? appDetail.Other_Reason_Description__c : ''}
                                        disabled="true"
                                    />
                                </div>
                            </div>
                        </div>
                        <h4>Income Details</h4>
                        <hr />
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Total Income Earners</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Total_income_earners__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Other Source of Income</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Other_Source_of_Income__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Total Monthly Gross Income</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Total_Monthly_Gross_Income__c : ''}
                                    disabled={!this.state.edit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Calculated Per Capita Income</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={appDetail ? appDetail.Calculated_per_capita_income__c : ''}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="x_title">
                            Delaration And Consent
                            <div className="clearfix" />
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Declaration_Completed__c : ''}
                                        readOnly="true"
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
                                    &nbsp;Declaration Completed
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-sm-3 checkContainer">
                                    <input
                                        type="checkbox"
                                        className="form-control"
                                        checked={appDetail ? appDetail.Media_Coverage_consent__c : ''}
                                        readOnly="true"
                                    />
                                </div>
                                <div className="col-sm-9 text-content">
                                    &nbsp;Media Coverage Consent
                                </div>
                            </div>
                        </div>
                        <div className="clearfix" />
                    </div>
                </div>
                <BeneficaryMember
                    beneficaryList={this.state.appBeneList}
                    houseHoldList={this.state.appHouList}
                />
                <Attachment
                    attachmentList={this.state.attachmentList}
                    token={this.props.user.siteToken.hash}
                />
            </div>
        );
    }
}

ApplicationDetail.propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object,
};

ApplicationDetail.defaultProps = {
    match: {},
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
