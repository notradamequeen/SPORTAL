import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideMenu from '../common/side_menu';
import { getBeneciciaryList } from '../actions';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class BeneficiaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.props.getBeneciciaryList(
            this.props.user.loggedInUser.Account.Id,
            this.props.user.siteToken.hash,
        );
    }
    render() {
        console.log(this.state.MainApplicantPersonData);
        return (
            <div id="application-list">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Beneficiaries </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page">
                            <div className="x_panel">
                                <div className="x_title" />
                                <div className="x_content" style={{ display: 'block', width: 'auto' }}>
                                    <table className="table table-striped" style={{ width: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" /></th>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Applicant</th>
                                                <th>DOB</th>
                                                <th>Payout Amount</th>
                                                <th>Last Payment Date</th>
                                                <th>Level</th>
                                                <th>Stream</th>
                                                <th>School</th>
                                                <th>Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.salesforce.beneficiaryList.records.map((BeneData) => {
                                                console.log('bene', BeneData);
                                                return (
                                                    <tr>
                                                        <td><input type="checkbox" /></td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Name}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Full_Name__c}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Application__r.Applicant_Name__c}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Date_of_Birth__c}</td>
                                                        <td>{BeneData.Total_Amount_Outstanding__c}</td>
                                                        <td>{BeneData.Last_Payment_Date__c}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Current_Level__c}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Stream__c}</td>
                                                        <td>{BeneData.Updated_by_Application_Person__r.Current_School__r ?
                                                            BeneData.Updated_by_Application_Person__r.Current_School__r.Name : ''}</td>
                                                        <td>{BeneData.Active__c}</td>
                                                        <td>
                                                            <Link
                                                                to={{ pathname: `/portal/beneficiary/${BeneData.Updated_by_Application_Person__r.Name}` }}
                                                                params={{ personId: BeneData.Updated_by_Application_Person__r.Name }}>
                                                                <button className="btn btn-orange">view</button>
                                                            </Link>
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

BeneficiaryList.propTypes = {
    getBeneciciaryList: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getBeneciciaryList,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList);
