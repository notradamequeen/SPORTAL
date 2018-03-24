import React from 'react';
import swal from 'sweetalert';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBeneficiaryList } from './actions';

class BeneficiaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: [],
        };
        this.getBeneficiaryList = getBeneficiaryList.bind(this);
    }
    async componentWillMount() {
        try {
            this.setState({ loading: true });
            const result = await this.getBeneficiaryList();
            this.setState({ loading: false, list: result.records || [] });
        } catch (error) {
            swal({
                text: error.toString(),
                title: 'An error when getting beneficiary records',
            });
        }
    }

    render() {
        const columns = [{
            Header: 'ID Number',
            accessor: 'ID_Number__c',
        }, {
            Header: 'ID Type',
            accessor: 'ID_Type__c',
        }, {
            Header: 'Name',
            accessor: 'Name',
        }, {
            accessor: 'Active__c', // Required because our accessor is not a string
            Header: 'Active Beneficiary',
            Cell: props => <i className={`fa fa-2x fa-${props.value ? 'check' : 'times'}`} />,
        }, {
            accessor: 'Last_Payment_Date__c',
            Header: 'Last Payment',
        }, {
            accessor: 'Nationality__c',
            Header: 'Nationality',
        }, {
            accessor: 'Race__c',
            Header: 'Race',
        }, {
            Header: 'Action',
            accessor: 'Updated_by_Application_Person__c',
            Cell: props => (
                <span style={{ textAlign: 'center' }}>
                    <Link to={`/portal/beneficiary/${props.value}`} className="btn btn-fill btn-primary"><i className="fa fa-eye" /> View</Link>
                </span>
            ),
        }];

    
        return (
            <div className="card">
                <div className="row">
                    <div className="col-md-12 btn-group-center text-center">
                        {/* 
                        this.props.user.loggedInUser.Partner_Authority__c === 'Approver' ?
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
                        */}
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
                                <ReactTable
                                    data={this.state.list}
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

BeneficiaryList.propTypes = {
    
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryList);
