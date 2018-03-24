import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/side_menu';
import { getApplicationList } from '../actions';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ReceiptList extends React.Component {
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
                            <p className="page_title">Receipts </p>
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
                                                <th>Receipt No</th>
                                                <th>Applicant No</th>
                                                <th>Issued By</th>
                                                <th>App.Amount</th>
                                                <th>Pay.Amount</th>
                                                <th>Beneficiary</th>
                                                <th>Status</th>
                                                <th>Actions</th>
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
                                                                to={{ pathname: `/portal/application/${mainApp.Application__r.Name}` }}
                                                                params={{ personId: mainApp.Application__r.Name }}
                                                            >
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

ReceiptList.propTypes = {
    user: PropTypes.object.isRequired,
    getReceiptList: PropTypes.func.isRequired,
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


export default connect(mapStateToProps, mapDispatchToProps)(ReceiptList);
