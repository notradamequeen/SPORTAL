import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/side_menu';
import { getApplicationList } from '../actions';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.props.getApplicationList(
            this.props.user.loggedInUser.Account.Id,
            this.props.user.siteToken.hash,
        );
    }
    render() {
        return (
            <div id="application-list">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Applications </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page">
                            <div className="x_panel">
                                <div className="x_title">
                                    <div className="col-md-12 btn-group-center">
                                        {this.props.user.loggedInUser.Partner_Authority__c == 'Approver' ?
                                            <div>
                                                <button className="btn btn-green">Approve</button>
                                                <button className="btn btn-red">Reject</button>
                                            </div>
                                            : <button className="btn btn-orange">Verify</button>
                                        }
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }}>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" /></th>
                                                <th>Application Id</th>
                                                <th>Applicant Name</th>
                                                <th>Beneficiaries</th>
                                                <th>Date Submitted</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.salesforce.applicationList.records.map(mainApp => (
                                                <tr>
                                                    <td><input type="checkbox" /></td>
                                                    <td>{mainApp.Application__r.Name}</td>
                                                    <td>{mainApp.Application__r.Applicant_Name__c}</td>
                                                    <td>{mainApp.Application__r.No_of_Bene__c}</td>
                                                    <td>{mainApp.Application__r.Date_of_Application__c}</td>
                                                    <td>{mainApp.Application__r.Application_Status__c}</td>
                                                    <td>
                                                        <button className="btn btn-orange">
                                                            <Link 
                                                            to={{pathname: `/portal/application/${mainApp.Application__r.Name}`}}
                                                            params={{ personId: mainApp.Application__r.Name}}>
                                                                view
                                                            </Link>
                                                        </button>
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
