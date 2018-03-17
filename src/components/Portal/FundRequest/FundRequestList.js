import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/side_menu';
import { getFundRequestList } from '../actions';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class FundRequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.props.getFundRequestList(
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
                            <p className="page_title">Fund Request List</p>
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
                                                <th>FR Id</th>
                                                <th>Psrtner Name</th>
                                                <th>Year</th>
                                                <th>Period</th>
                                                <th>Partner Type</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.salesforce.fundRequestList.records.map((frItem) => {
                                                return (
                                                    <tr>
                                                        <td><input type="checkbox" /></td>
                                                        <td>{frItem.Name}</td>
                                                        <td>{frItem.Partner_Name__r.Name}</td>
                                                        <td>{frItem.Year__c}</td>
                                                        <td>{frItem.Period__c}</td>
                                                        <td>{frItem.Partner_Type__c}</td>
                                                        <td>{frItem.Type__c}</td>
                                                        <td>{frItem.FR_Status__c}</td>
                                                        <td>
                                                            <button className="btn btn-orange">
                                                                <Link
                                                                    to={{ pathname: `/portal/application/${frItem.Name}` }}
                                                                    params={{ frId: frItem.Name }}
                                                                >
                                                                    view
                                                                </Link>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
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

FundRequestList.propTypes = {
    user: PropTypes.object.isRequired,
    getFundRequestList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getFundRequestList,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(FundRequestList);
