import React from 'react';
import PropTypes from 'prop-types';


const BeneficiaryAppInfo = (props) => {
    const { editMode, beneDetail } = props;

    return (
        <div className="x_content" style={{ display: 'block' }} >
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Applying to</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? (beneDetail.Applying_to__r ? beneDetail.Applying_to__r.Name : '') : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Referred From</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Referred_From__c : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Referred Date</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Referred_Date__c : ''}
                        disabled="true"
                    />
                </div>
                <div className="form-group">
                    <label>Referring Reason</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Referring_Reason__c : ''}
                        disabled="true"
                    />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Application Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Application_Type__c : ''}
                        disabled="true"
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Application_Status__c : ''}
                        disabled="true"
                    />
                </div>
                <div className="form-group">
                    <label>Current Level</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Current_Level__c : ''}
                        disabled="true"
                    />
                </div>
                <div className="form-group">
                    <label>Stream</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Stream__c : ''}
                        disabled="true"
                    />
                </div>
            </div>
        </div>
    );
};

BeneficiaryAppInfo.defaultProps = {
    editMode: false,
};

BeneficiaryAppInfo.propTypes = {
    editMode: PropTypes.bool,
    beneDetail: PropTypes.object.isRequired,
};

export default BeneficiaryAppInfo;

