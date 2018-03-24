import React from 'react';
import PropTypes from 'prop-types';

const BeneficiaryContactDetail = (props) => {
    const { beneDetail, editMode } = props;

    return (
        <div className="x_content" style={{ display: 'block' }} >
            <div className="col-sm-6">
                <div className="form-group">
                    <label htmlFor="emailAddress">
                        Email Address
                        <input
                            type="text"
                            name="emailAddress"
                            className="form-control"
                            value={beneDetail ? beneDetail.Email_Address__c : ''}
                            onChange={e => props.onFormChanged('Email_Address__c', e.target.value)}
                            disabled={!editMode}
                        />
                    </label>
                    
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Home Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Home_Phone__c : ''}
                        onChange={e => props.onFormChanged('Home_Phone__c', e.target.value)}
                        disabled={!editMode}
                    />
                </div>
                <div className="form-group">
                    <label>Mobile Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Mobile_Phone__c : ''}
                        onChange={e => props.onFormChanged('Mobile_Phone__c', e.target.value)}
                        disabled={!editMode}
                    />
                </div>
            </div>
        </div>
    );
};

BeneficiaryContactDetail.propTypes = {
    beneDetail: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    onFormChanged: PropTypes.func.isRequired,
};

BeneficiaryContactDetail.defaultProps = {
    editMode: false,
};

export default BeneficiaryContactDetail;
