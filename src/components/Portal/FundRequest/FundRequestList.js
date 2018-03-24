import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { getAllFundRequest } from './actions';


class FundRequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fundRequestList: [],
            loading: true,
        };
    }
    async componentWillMount() {
        this.setState({
            loading: true,
        });
        const fundRequestList = await getAllFundRequest(this.props.user.loggedInUser.AccountId, this.props.user.siteToken.hash);
        this.setState({ loading: false, fundRequestList: fundRequestList.records || [] });
    }
    render() {
        const columns = [{
            Header: 'Fund No',
            accessor: 'Name',
        }, {
            Header: 'Partner Name',
            accessor: 'Partner_Name__r.Name',
        }, {
            Header: 'Year',
            accessor: 'Year__c',
        }, {
            accessor: 'Period__c', // Required because our accessor is not a string
            Header: 'Period'
        }, {
            Header: 'Projection Amount (Pri/Sec)',
            accessor: 'Projection_Amount_Pri_Sec__c',
        }, {
            Header: 'FR Status',
            accessor: 'FR_Status__c',
        }];
        return (
            <div className="card">
                <div className="row">
                    <div className="col-md-12 btn-group-center text-center">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <p style={{ textAlign: 'center' }}>
                                {this.state.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                            </p>
                            <div className="content table-responsive table-full-width">
                                <ReactTable
                                    data={this.state.fundRequestList}
                                    columns={columns}
                                />
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
        getAllFundRequest,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(FundRequestList);
