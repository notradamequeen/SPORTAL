import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import ModalReceive from './ModalReceive';
import { getAllReceipt, updateReceipt } from './actions';

class Receipt extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            receipts: [],
            modalReceive: false,
            selectedReceipt: [],
            modalData: {},
        };
        this.getAllReceipt = getAllReceipt.bind(this);
        this.save = this.save.bind(this);
        this.selectReceipt = this.selectReceipt.bind(this);
        this.updateReceipt = updateReceipt.bind(this);
    }

    async componentWillMount() {
        try {
            this.setState({ loading: true });
            const receiptList = await this.getAllReceipt();
            if (receiptList.records !== undefined) {
                this.setState({ receipts: receiptList.records });
            }
            this.setState({ loading: false });
        } catch (error) {
            swal({
                title: 'AN error occured',
                text: error.toString(),
            });
            this.setState({ loading: false });
        }
    }

    async save() {
        if (this.state.loading) return;
        let status = true;
        this.state.receipts.map((receipt) => {
            if (this.state.selectedReceipt.indexOf(receipt.Id) > -1) {
                if (receipt.Approved_Amount__c < this.state.modalData.Given_Amount__c) {
                    status = false;
                }
            }
        });
        if (status === false) {
            swal({
                text: 'The amount given is too much for some receipts',
                title: 'Invalid Given Amount',
            });
            return;
        }
        try {
            this.setState({ loading: true });
            const reply = await this.updateReceipt();
            swal({
                title: 'Receipt updated',
                text: reply.message,
            });
            this.setState({ selectedReceipt: [], modalData: {}, modalReceive: false });
            this.componentWillMount();
        } catch (error) {
            swal({
                title: 'AN error occured',
                text: error.toString(),
            });
            this.setState({ loading: false, modalData: {} });
        }
    }

    selectReceipt(id = null) {
        let { selectedReceipt } = this.state;
        const index = selectedReceipt.indexOf(id);
        if (id === 'all') {
            if (selectedReceipt.length > 0) selectedReceipt = [];
            else {
                this.state.receipts.map(receipt => (receipt.Status__c === 'Disbursed' ? selectedReceipt.push(receipt.Id) : null));
            }
        } else if (index > -1) {
            selectedReceipt.splice(index, 1);
        } else {
            selectedReceipt.push(id);
        }
        this.setState({
            selectedReceipt,
        });
    }

    render() {
        return (
            <div className="card">
                <ModalReceive
                    visible={this.state.modalReceive}
                    close={() => this.setState({ modalReceive: false, modalData: {} })}
                    save={this.save}
                    onFormChanged={(value, attribute) => this.setState({
                        modalData: {
                            ...this.state.modalData,
                            [attribute]: value,
                        },
                    })}
                    loading={this.state.loading}
                    formValue={this.state.modalData}
                />
                <div className="col-md-12 btn-group-center">
                    <button
                        className="btn btn-default"
                        onClick={() => {
                            if (this.state.selectedReceipt.length === 0) return;
                            this.setState({ modalReceive: true });
                        }}
                    >
                        <i className="fa fa-paper-plane" /> Update Receive
                    </button>
                </div>
                                
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onClick={() => this.selectReceipt('all')}
                                    />
                                </th>
                                <th>Receipt No</th>
                                <th>Application No</th>
                                <th>Approved Amount</th>
                                <th>Given Amount</th>
                                <th>Beneficary Name</th>
                                <th>Status</th>
                                <th>Action</th>
                                {/* <th>Date Approved</th>
                                <th>Date Received</th>*
                                <th>Schedule Payout Date</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.receipts.map(receipt => (
                                <tr key={receipt.Id}>
                                    <th>
                                        {receipt.Status__c === 'Disbursed' ?
                                            <input
                                                checked={this.state.selectedReceipt.indexOf(receipt.Id) > -1}
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={() => this.selectReceipt(receipt.Id)}
                                                style={{
                                                    width: 20, height: 20,
                                                }}
                                            /> : '-' }
                                    </th>
                                    <td>{receipt.Name}</td>
                                    <td>{receipt.Application_No__c}</td>
                                    <td>{receipt.Approved_Amount__c}</td>
                                    <td>{receipt.Given_Amount__c}</td>
                                    <td>{receipt.Beneficiary__r ? receipt.Beneficiary__r.Name : null}</td>
                                    <td>{receipt.Status__c}</td>
                                    <td>
                                        <button
                                            className="btn btn-default"
                                            disabled={receipt.Status__c !== 'Disbursed'}
                                            onClick={() => {
                                                this.selectReceipt(receipt.Id);
                                                this.setState({ modalReceive: true });
                                            }}
                                        >
                                            <i className="fa fa-paper-plane" /> Receive
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            { this.state.receipts.length === 0 ? <td colSpan={8} style={{ padding: '20px 0', textAlign: 'center' }}> No Receipt </td> : null }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Receipt.propTypes = {
    user: PropTypes.object.isRequired,
    salesforce: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});
export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
