import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ForOfficialUse = (props) => {
    const { beneDetail, editMode } = props;
    return (
        <div className="x_content" style={{ display: 'block' }} >
            <div className="col-sm-6">
                <div className="form-group">
                    <label>No Of Receipt - Max</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.No_of_Receipt__c : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>No Of Receipt Approved</label>
                    <input
                        type="number"
                        className="form-control"
                        value={beneDetail ? beneDetail.No_of_Receipts_Approved__c : ''}
                        onChange={e => props.onFormChanged('No_of_Receipts_Approved__c', e.target.value)}
                        disabled={!editMode}
                    />
                </div>
                <div className="form-group">
                    <label>Approve Exception</label>
                    <input
                        type="checkbox"
                        style={{ width: 20, height: 20 }}
                        checked={beneDetail ? beneDetail.Approve_Exception__c : null}
                        onChange={e => props.onFormChanged('Approve_Exception__c', e.target.checked)}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Payout Start</label>
                    <DatePicker
                        className="form-control"
                        selected={beneDetail ? (beneDetail.Payout_Start__c ? moment(beneDetail.Payout_Start__c) : null) : null}                        disabled={!editMode}
                        onChange={val => props.onFormChanged('Payout_Start__c', val)}
                        isClearable
                    />
                </div>
                <div className="form-group">
                    <label>Payout End</label>
                    <DatePicker
                        className="form-control"
                        selected={beneDetail ? (beneDetail.Payout_End__c ? moment(beneDetail.Payout_End__c) : null) : null}
                        disabled={!editMode}
                        onChange={val => props.onFormChanged('Payout_End__c', val)}
                        isClearable
                    />
                </div>
            </div>
            <div className="clearfix" />
        </div>
    );
};

ForOfficialUse.propTypes = {
    beneDetail: PropTypes.object,
    editMode: PropTypes.bool,
    onFormChanged: PropTypes.func.isRequired,
};

ForOfficialUse.defaultProps = {
    beneDetail: null,
    editMode: false,
};

export default ForOfficialUse;
