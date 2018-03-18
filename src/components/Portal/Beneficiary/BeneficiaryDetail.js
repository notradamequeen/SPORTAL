import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from '../common/side_menu';
import { getBeneDetail, getBeneReceiptList } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';
import BeneReceiptList from './BeneReceiptList'

class BeneficiaryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BeneDetail: [],
            BeneReceiptList: [],
        };
    }
    componentDidMount() {
        getBeneDetail(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            // console.log(json.records[0])
            this.setState({ BeneDetail: json.records });
        });
        getBeneReceiptList(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            this.setState({ BeneReceiptList: json.records})
        })
    }
    render() {
        console.log(this.state.BeneDetail);
        console.log(BeneReceiptList)
        const approver = this.props.user.loggedInUser.Partner_Authority__c.toLowerCase() == 'approver'
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title ">
                            <span className="pull-left">
                                <p className="page_title">Beneficiary Detail </p>
                            </span>
                            <span className="pull-right">
                                <button className="btn btn-green">
                                {approver ? "Approve" : "Verify" }
                                </button>
                                <button className="btn btn-red">Reject</button>
                                <button className="btn-renew">Renew Application</button>
                                <button className="btn-transfer">Transfer</button>
                                <button className="btn btn-red">Terminate</button>                                
                            </span>
                            <hr width="100%" />
                        </div>
                        <div className="content-page col-lg-8 col-md-7">
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
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Full_Name__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].ID_Type__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].ID_Number__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Gender__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Current School</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Current_School__r.Name : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Nationality__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Religion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Religion__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Relationship to Applicant</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Relationship_to_Applicant__c : ''}
                                            disabled="true" />
                                    </div>
                                    <div className="form-group">
                                        <label>Application Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Application_Date__c : ''}
                                            disabled="true" />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Full_Name__c : ''}
                                            disabled="true" />
                                    </div>
                                    <div className="form-group">
                                        <label>Age at Application</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Age_at_Application__c : ''}
                                            disabled="true" />
                                    </div>
                                    <div className="form-group">
                                        <label>Race</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Race__c : ''}
                                            disabled="true" />
                                    </div>
                                    <div className="form-group">
                                        <label>Marital Status</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Marital_Status__c : ''}
                                            disabled="true" />
                                    </div>
                                </div>                                
                                </div>
                                <div className="x_title">
                                    Beneficiary Information
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Applying to</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Applying_to__r.Name : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Referred From</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Referred_From__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Referred Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Referred_Date__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Referring Reason</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Referring_Reason__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Application Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Application_Type__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Application_Status__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Current Level</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Current_Level__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Stream</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Stream__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>                             
                                </div>
                                <div className="x_title">
                                    Contact Details
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Email_Address__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Home Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Home_Phone__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Mobile_Phone__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                </div>                             
                            </div>
                        </div>
                        <div className = "col-lg-4 col-md-5">
                            <BeneReceiptList ReceiptList = {this.state.BeneReceiptList}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BeneficiaryDetail.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryDetail);
