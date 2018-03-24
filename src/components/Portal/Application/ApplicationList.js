import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/SideMenu';
import { getApplicationList } from './actions';

class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicationList: [],
            loading: false,
        };
        this.getApplicationList = getApplicationList.bind(this);
    }
    componentDidMount() {
        this.getApplicationList();
    }
    render() {
        return (
            <div className="x_panel">
                <div className="x_title">
                    <div className="col-md-12 btn-group-center">
                        {this.props.user.loggedInUser.Partner_Authority__c === 'Approver' ?
                            <div>
                                <button className="btn btn-success">
                                    <i className="fa fa-thumbs-up" /> Approve
                                </button>
                                <button className="btn btn-danger">
                                    <i className="fa fa-times" /> Reject
                                </button>
                            </div>
                            :
                            <button className="btn btn-warning">
                                <i className="fa fa-paper-plane" /> Submit
                            </button>
                        }
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <p style={{ textAlign: 'center' }}>
                                {this.state.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                            </p>
                            <div className="content table-responsive table-full-width">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Application Id</th>
                                            <th>Applicant Name</th>
                                            <th>Beneficary Name</th>
                                            <th>Beneficiaries</th>
                                            <th>Date Submitted</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { this.state.applicationList.map(mainApp => (
                                            <tr style={{ color: mainApp.Application__r.Fail_Eligibility__c ? 'red' : '#222' }}>
                                                <td><input type="checkbox" /></td>
                                                <td>{mainApp.Application__r.Name}</td>
                                                <td>{mainApp.Application__r.Applicant_Name__c}</td>
                                                <td>{mainApp.Full_Name__c}</td>
                                                <td>{mainApp.Application__r.No_of_Bene__c}</td>
                                                <td>{mainApp.Application__r.Date_of_Application__c}</td>
                                                <td>{mainApp.Application__r.Application_Status__c}</td>
                                                <td>
                                                    <Link
                                                        to={{ pathname: `/portal/application/${mainApp.Application__c}` }}
                                                    >
                                                        <button className="btn btn-small btn-orange">
                                                            <i className="fa fa-eye" /> View
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApplicationList.propTypes = {
    user: PropTypes.object.isRequired,
    getApplicationList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getApplicationList,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationList);
