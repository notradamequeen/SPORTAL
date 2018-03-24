import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const ModalReceive = props => (
    <div className="modal modal-backdrop" data-backdrop="static" tabIndex="-1" role="dialog" style={{ display: props.visible ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Receive Update</h4>
                </div>
                <div className="modal-body">
                    <p style={{ textAlign: 'center' }}>
                        {props.loading ? <i className="fa fa-3x fa-spinner fa-spin" /> : null}
                    </p>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p className="labelFor">Given Amount</p>
                        <input value={props.formValue.Given_Amount__c || ''} type="number" className="form-control" onChange={e => props.onFormChanged(e.target.value, 'Given_Amount__c')} />
                        <p className="labelFor">Date Received</p>
                        <DatePicker
                            selected={props.formValue.Date_Received__c}
                            onChange={value => props.onFormChanged(value, 'Date_Received__c')}
                            className="form-control"
                        />
                        <p className="labelFor">Mode Of Payment</p>
                        <select className="form-control" onChange={e => props.onFormChanged(e.target.value, 'Mode_Of_Payment__c')} value={props.formValue.Mode_Of_Payment__c || ''}>
                            <option value="" selected>-</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Giro">Giro</option>
                        </select>
                        <p className="labelFor">Cheque or transaction no</p>
                        <input value={props.formValue.Cheque_Transaction_No__c || ''} maxLength="20" type="text" className="form-control" onChange={e => props.onFormChanged(e.target.value, 'Cheque_Transaction_No__c')} />
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={props.close}>Cancel</button>
                    <button type="button" className="btn btn-success" onClick={props.save}>Save changes</button>
                </div>
            </div>
        </div>
    </div>
);

ModalReceive.propTypes = {
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    onFormChanged: PropTypes.func.isRequired,
    formValue: PropTypes.object,
    loading: PropTypes.bool,
};

ModalReceive.defaultProps = {
    visible: false,
    formValue: {},
    loading: false,
};

export default ModalReceive;
