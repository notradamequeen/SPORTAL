import React from 'react';
import PropTypes from 'prop-types';
import BeneficaryMember from '../../Application/BeneficaryMember';


const BeneficiaryInformation = (props) => {
    const { beneDetail, editMode } = props;
    return (
        <div className="x_content" style={{ display: 'block' }} >
            <div className="col-sm-6">
                <div className="form-group">
                    <label htmlFor="BeneficiaryName">
                        Name
                        <input
                            type="text"
                            className="form-control"
                            value={beneDetail ? beneDetail.Full_Name__c : ''}
                            disabled={!editMode}
                            onChange={e => props.onFormChanged('Full_Name__c', e.target.value)}
                        />
                    </label>
                    
                </div>
                <div className="form-group">
                    <label>ID Type</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.ID_Type__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('ID_Type__c', e.target.value)}
                    >
                        {props.getPicklist('Person__c', 'ID_Type__c')}
                    </select>
                </div>
                <div className="form-group">
                    <label>ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.ID_Number__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('ID_Number__c', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Gender__c : ''}
                        onChange={e => props.onFormChanged('Gender__c', e.target.value)}
                        disabled={!editMode}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Current School</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? (beneDetail.Current_School__r ? beneDetail.Current_School__r.Name : '') : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Nationality</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Nationality__c : ''}
                        onChange={e => props.onFormChanged('Nationality__c', e.target.value)}
                        disabled={!editMode}
                    >
                        {props.getPicklist('Person__c', 'Nationality__c')}
                    </select>
                </div>
                <div className="form-group">
                    <label>Religion</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Religion__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('Religion__c', e.target.value)}
                    >
                        {props.getPicklist('Person__c', 'Religion__c')}
                    </select>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Relationship to Applicant</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Relationship_to_Applicant__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('Relationship_to_Applicant__c', e.target.value)}
                    >
                        {props.getPicklist('Person__c', 'Relationship_to_Applicant__c')}
                    </select>
                </div>
                <div className="form-group">
                    <label>Application Date</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Application_Date__c : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Date_of_Birth__c : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Age at Application</label>
                    <input
                        type="text"
                        className="form-control"
                        value={beneDetail ? beneDetail.Age_at_Application__c : ''}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Race</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Race__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('Race__c', e.target.value)}
                    >
                        {props.getPicklist('Person__c', 'Race__c')}
                    </select>
                </div>
                <div className="form-group">
                    <label>Marital Status</label>
                    <select
                        className="form-control"
                        value={beneDetail ? beneDetail.Marital_Status__c : ''}
                        disabled={!editMode}
                        onChange={e => props.onFormChanged('Marital_Status__c', e.target.value)}
                    >
                        {props.getPicklist('Person__c', 'Marital_Status__c')}
                    </select>
                </div>
            </div>
        </div>
    );
};

BeneficiaryInformation.propTypes = {
    beneDetail: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    getPicklist: PropTypes.func.isRequired,
    onFormChanged: PropTypes.func.isRequired,
};

BeneficiaryInformation.defaultProps = {
    editMode: false,
};

export default BeneficiaryInformation;
