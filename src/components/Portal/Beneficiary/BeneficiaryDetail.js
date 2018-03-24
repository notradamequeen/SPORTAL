import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import BeneReceiptList from './BeneReceiptList';

import { getBeneficiaryDetail, changeBeneficiaryStatus, getPicklist, save } from './actions';
import {
    BeneficiaryForOfficialUse,
    BeneficiaryContactDetail,
    BeneficiaryInformation,
    BeneficiaryAppInformation,
} from './components';
import { saveObject } from '../../../actions/salesforces';

class BeneficiaryDetail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            beneDetail: null,
            loading: false,
            editMode: false,
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getPicklist = getPicklist.bind(this);
        this.save = save.bind(this);
    }
    async componentWillMount() {
        this.setState({ loading: true });
        try {
            const detail = await getBeneficiaryDetail(this.props.match.params.id, this.props.user.siteToken.hash);
            this.setState({
                beneDetail: detail.records[0] || null,
                loading: false,
            });
        } catch (error) {
            swal({
                text: error.toString(),
                title: 'Error when retriving beneficiary',
            });
        }
    }

    onChange(attributeName, value) {
        this.setState({
            beneDetail: {
                ...this.state.beneDetail,
                [attributeName]: value,
            },
        });
    }

    async changeStatus(status) {
        if (this.state.loading) return;
        let dataToUpdate = {
            Id: this.state.beneDetail.Id,
            Application_Status__c: status,
        };
        const { beneDetail } = this.state;
        if (status === 'Verified by Partner') {
            dataToUpdate = Object.assign({}, dataToUpdate, {
                Payout_Start__c: beneDetail.Payout_Start__c,
                Payout_End__c: beneDetail.Payout_End__c,
                Approve_Exception__c: beneDetail.Approve_Exception__c,
                No_of_Receipts_Approved__c: beneDetail.No_of_Receipts_Approved__c,
            });
        }
        this.setState({ loading: true });
        try {
            const response = await changeBeneficiaryStatus(dataToUpdate, this.props.user.siteToken.hash);
            if (response.status !== 200) {
                swal({
                    title: 'Error when updating status',
                    text: response.message,
                    dangerMode: true,
                });
            } else {
                swal({
                    title: 'Successfully update beneficiary status',
                    text: `This beneficiary status has been updated to "${status}"`,
                });
            }
            this.setState({ loading: false });
            
            this.componentWillMount();
        } catch (error) {
            swal({
                text: error.toString(),
                title: 'An error occured when updating status',
            });
            this.setState({ loading: false });
        }
    }


    render() {
        const approver = this.props.user.loggedInUser.Partner_Authority__c.toLowerCase() === 'approver';
        let buttons = [];
        const { beneDetail, editMode } = this.state;
        if (beneDetail === null) {
            return (
                <p style={{ textAlign: 'center' }}>
                    {this.state.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                </p>
            );
        }
        if (approver) {
            buttons = [
                (beneDetail.Application_Status__c === 'Rejected by Partner' || beneDetail.Application_Status__c === 'Verified by Partner') ?
                    <button className="btn btn-info" onClick={() => this.changeStatus('Received')}>Revert</button> : ''
            ];
            if (beneDetail.Application_Status__c === 'Verified by Partner') {
                buttons.push(
                    <button
                        className="btn btn-success btn-fill"
                        onClick={() => {
                            if (this.props.user.loggedInUser.Account.Partner_Type__c === 'School') this.changeStatus('Submitted to SPMF');
                            else {
                                this.changeStatus('Approved by Partner');
                            }
                        }}
                    >
                        <i className="fa fa-thumbs-up" /> Approve
                    </button>,
                    <button className="btn btn-danger btn-fill" onClick={() => this.changeStatus('Rejected By Partner')}>Reject</button>);
            }
        } else if (beneDetail.Application_Status__c === 'Received') {
            buttons.push(<button className="btn btn-success btn-fill" onClick={() => this.changeStatus('Verified by Partner')}>Verify</button>);
        }

        if (beneDetail.Application_Status__c === 'Received') {
            if (!editMode) {
                buttons.push(
                    <button className="btn btn-default" onClick={() => this.setState({ editMode: true })} key="edit">
                        <i className="fa fa-pencil" /> Edit
                    </button>);
            } else {
                buttons.push(
                    <button className="btn btn-warning" onClick={() => this.setState({ editMode: false })} key="cancel">
                        Cancel
                    </button>,
                    <button className="btn btn-warning" onClick={this.save} key="Save">
                        <i className="fa fa-save" /> Save
                    </button>);
            }
        }
        return (
            <div id="beneficiaryDetail" className="row">
                <div className="col-lg-9 col-sm-12 col-md-9">
                    <div className="card">
                        <div className="col-md-3">
                            <button
                                className="btn btn-default btn-fill"
                                onClick={() => {
                                    if (this.props.history.length <= 1) this.props.history.push(`/portal/application/${beneDetail.Application__c}`);
                                    else this.props.history.goBack();
                                }}
                            >
                                <i className="fa fa-arrow-left" /> Back
                            </button>
                        </div>
                        <div className="col-md-9 pull-right" style={{ textAlign: 'right', display: beneDetail.RecordType.Name === 'Beneficiary' ? 'block' : 'none' }}>
                            <div className="btn-group">
                                {buttons}
                                <button className="btn btn-info btn-fill" onClick={() => this.changeStatus('Received')}>Renew Application</button>
                                <button className="btn btn-warning btn-fill">Transfer</button>
                                <button className="btn btn-danger" onClick={() => this.changeStatus('Rejected')}>Terminate</button>
                            </div>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <p style={{ textAlign: 'center' }}>
                            {this.state.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                        </p>
                        <h4>Basic Information</h4>
                        <hr />
                        <BeneficiaryInformation
                            editMode={editMode}
                            beneDetail={beneDetail}
                            onFormChanged={this.onChange}
                            getPicklist={this.getPicklist}
                        />
                        { beneDetail.RecordType.Name === 'Beneficiary' ?
                            <div>
                                <h4>Application Information</h4>
                                <hr />
                                <BeneficiaryAppInformation
                                    editMode={editMode}
                                    beneDetail={beneDetail}
                                    onFormChanged={this.onChange}
                                />
                            </div> : null }
                        <h4>Contact Details</h4>
                        <BeneficiaryContactDetail
                            editMode={editMode}
                            beneDetail={beneDetail}
                            onFormChanged={this.onChange}
                            getPicklist={this.getPicklist}
                        />
                        { beneDetail.RecordType.Name === 'Beneficiary' ?
                            <div>
                                <h4>For Official Use</h4>
                                <BeneficiaryForOfficialUse
                                    editMode={beneDetail.Application_Status__c === 'Received'}
                                    beneDetail={beneDetail}
                                    onFormChanged={this.onChange}
                                />
                            </div> : null }
                        <div className="clearfix" />
                    </div>
                </div>
                <div className="col-md-3">
                    <BeneReceiptList
                        beneficiaryId={this.props.match.params.id}
                        token={this.props.user.siteToken.hash}
                    />
                </div>
            </div>
        );
    }
}

BeneficiaryDetail.propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    objectInfo: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
    objectInfo: state.objectInfo,
});


export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryDetail);
