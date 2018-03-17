import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from '../common/side_menu';
import { getApplicationDetail } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ApplicationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appDetail: [],
        };
    }
    componentDidMount() {
        getApplicationDetail(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log(json.records[0])
            this.setState({ appDetail: json.records });
        });
    }
    render() {
        console.log(this.state.appDetail);
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Main Applicant </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page">
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
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Type</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.ID_Type__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>ID Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.ID_Number__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Date Of Birth</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Date_of_Birth__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Marital Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Marital_Status__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Marital Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Marital_Status__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Gender__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Nationality__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Nationality</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Nationality__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Race</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Race__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Race</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Other_Race__c : ''}
                                                disabled="true" />
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
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Street Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Unit_Number__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].City__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>                                        
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Type of Flat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Flat_Type__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Other Type of Flat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Other_Flat_Type__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Country__c : ''}
                                                disabled="true" />
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
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mobile Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Mobile_Phone__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Email_Address__c : ''}
                                                disabled="true" />
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
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Company</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Company__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Occupation</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Occupation__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Employment Status</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Employment_Status__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Employment Start Date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Employment_Start_Date__c : ''}
                                                disabled="true" />
                                        </div>
                                        <div className="form-group">
                                            <label>Monthly Gross Income</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant__r.Monthly_Gross_Income__c : ''}
                                                disabled="true" />
                                        </div>
                                    </div>
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
