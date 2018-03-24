import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import ModalReceive from '../Receipt/ModalReceive';
import { getBeneficiaryReceiptList } from './actions';
import { updateReceipt } from '../Receipt/actions';

class BeneReceiptList extends React.Component {
    constructor() {
        super();
        this.state = {
            modalReceive: false,
            modalData: {},
            selectedReceipt: [],
            loading: false,
            receiptList: [],
        };
        this.updateReceipt = updateReceipt.bind(this);
        this.save = this.save.bind(this);
    }

    async componentWillMount() {
        this.setState({ loading: true });
        try {
            const receiptList = await getBeneficiaryReceiptList(this.props.beneficiaryId, this.props.token);
            this.setState({
                receiptList: receiptList.records || [],
                loading: false,
            });

        } catch (error) {
            swal({
                text: error.toString(),
                title: 'Error when retriving receipt',
            });
        }
    }
    async save() {
        if (this.state.loading) return;
        let status = true;
        this.state.receiptList.map((receipt) => {
            if (this.state.selectedReceipt.indexOf(receipt.Id) > -1) {
                if (receipt.Approved_Amount__c < this.state.modalData.Given_Amount__c) {
                    status = false;
                }
            }
        });
        if (status === false) {
            swal({
                text: 'The amount given is too much for this receipt.',
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
    render() {
        const { receiptList } = this.state;
        return (
            <div className="panel" style={{ padding: 10 }}>
                <h4 className="title">Receipts</h4>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>Action</th>
                                <th>Receipt No</th>
                                <th>Approved Amt</th>
                                <th>Scheduled Payout</th>
                                <th>Date Received</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                { receiptList.map(receipt => (
                                    <tr>
                                        <td>
                                            { receipt.Status__c === 'Disbursed' ?
                                                <button className="btn btn-sm btn-fill btn-primary" onClick={() => this.setState({ modalReceive: true, selectedReceipt: [receipt.Id] })}>Update</button> : null
                                            }
                                        </td>
                                        <td>{receipt.Name}</td>
                                        <td>${receipt.Approved_Amount__c}</td>
                                        <td>{moment(receipt.Scheduled_Payout_Date__c).format('DD-MMM-YYYY')}</td>
                                        <td>{receipt.Date_Received__c ? moment(receipt.Date_Received__c).format('DD-MMM-YYYY') : '-'}</td>
                                        <td>{receipt.Status__c}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
            </div>
        );
    }
}

BeneReceiptList.propTypes = {
    beneficiaryId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};


export default BeneReceiptList;
