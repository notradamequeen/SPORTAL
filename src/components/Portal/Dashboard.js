import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { spmfcloudFunctionUrl } from '../../actions/salesforces';
import { describeBeneficiaryObject } from './Beneficiary/actions';
import AgencyInfo from './AgencyInfo';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardData: {},
            agencyInfoData: {},
        };
    }

    async componentWillMount() {
        this.setState({ loading: true });
        this.props.describeBeneficiaryObject();
        try {
            const fetchOption = {
                headers: {
                    'hash-token': this.props.user.siteToken.hash,
                },
                cache: 'default',
            };
            const dashboardData = await fetch(`${spmfcloudFunctionUrl}/dashboard`, fetchOption)
                .then(response => response.json());
            const agencyInfoData = await fetch(`${spmfcloudFunctionUrl}/sobject/Account/${this.props.user.loggedInUser.AccountId}`, fetchOption)
                .then(response => response.json());
            this.setState({ loading: false, dashboardData, agencyInfoData: agencyInfoData.result });
        } catch (error) {
            swal({
                title: 'An error occured when getting dashboard data',
                text: error.toString(),
            });
            this.setState({ loading: false });
        }
    }

    render() {
        const { dashboardData, loading, agencyInfoData } = this.state;
        if (loading) {
            return <p style={{ textAlign: 'center' }}><i className="fa fa-3x fa-spinner fa-spin" /></p>;
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-4 col-sm-6">
                        <div className="card">
                            <div className="content">
                                <div className="row">
                                    <div className="col-xs-5">
                                        <div className="icon-big icon-warning text-center">
                                            <i className="ti-user" />
                                        </div>
                                    </div>
                                    <div className="col-xs-7">
                                        <div className="numbers">
                                            <p>Beneficiaries</p> { dashboardData.beneficariesCount }
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <hr />
                                    <div className="stats">
                                        <i className="ti-reload" /> { moment(dashboardData.timeIssued).fromNow(true) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card">
                            <div className="content">
                                <div className="row">
                                    <div className="col-xs-5">
                                        <div className="icon-big icon-success text-center">
                                            <i className="ti-wallet" />
                                        </div>
                                    </div>
                                    <div className="col-xs-7">
                                        <div className="numbers">
                                            <p>Funded</p> ${dashboardData.totalFunded ? dashboardData.totalFunded.toLocaleString() : 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <hr />
                                    <div className="stats">
                                        <i className="ti-calendar" /> {moment(dashboardData.timeIssued).fromNow(true)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="card">
                            <div className="content">
                                <div className="row">
                                    <div className="col-xs-5">
                                        <div className="icon-big icon-danger text-center">
                                            <i className="ti-pulse" />
                                        </div>
                                    </div>
                                    <div className="col-xs-7">
                                        <div className="numbers">
                                            <p>Applications</p> { dashboardData.totalApplication }
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <hr />
                                    <div className="stats">
                                        <i className="ti-timer" /> {moment(dashboardData.timeIssued).fromNow(true)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AgencyInfo data={agencyInfoData} />
            </div>
        );
    }
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    describeBeneficiaryObject: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {

};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        describeBeneficiaryObject,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
