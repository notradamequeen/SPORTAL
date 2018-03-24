import React from 'react';
import PropTypes from 'prop-types';

const AgencyInfo = props => (
    <div className="row">
        <div className="col-md-6">
            <div className="card">
                <div className="header">
                    <h5 className="">Pri/Sec Fund</h5>
                </div>
                <div className="content">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td with="50%"><strong>Disbursed Amount</strong></td>
                                <td>${props.data.Disbursed_Amount_Pri_Sec__c ? props.data.Disbursed_Amount_Pri__c.toLocaleString() : 0}</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Available Amount</strong></td>
                                <td>${props.data.Available_Amount_Pri_Sec__c ? props.data.Available_Amount_Pri_Sec__c.toLocaleString() : 0 }</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Approved Amount</strong></td>
                                <td>${props.data.Approved_Amount_Pri_Sec__c ? props.data.Approved_Amount_Pri_Sec__c.toLocaleString() : 0 }</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Account Balance</strong></td>
                                <td>${props.data.Account_Balance_Pri_Sec__c ? props.data.Account_Balance_Pri_Sec__c.toLocaleString() : 0 }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="card ">
                <div className="header">
                    <h5>Post Sec Fund</h5>
                </div>
                <div className="content">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td with="50%"><strong>Disbursed Amount</strong></td>
                                <td>${props.data.Disbursed_Amount_Post_Sec__c ? props.data.Disbursed_Amount_Post_Sec__c.toLocaleString() : '0'}</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Available Amount</strong></td>
                                <td>${props.data.Available_Amount_Post_Sec__c ? props.data.Available_Amount_Post_Sec__c.toLocaleString() : 0 }</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Approved Amount</strong></td>
                                <td>${props.data.Approved_Amount_Post_Sec__c ? props.data.Approved_Amount_Post_Sec__c.toLocaleString() : 0}</td>
                            </tr>
                            <tr>
                                <td with="50%"><strong>Account Balance</strong></td>
                                <td>${props.data.Account_Balance_Post_Sec__c ? props.data.Account_Balance_Post_Sec__c.toLocaleString() : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);

AgencyInfo.propTypes = {
    data: PropTypes.object.isRequired,
};


export default AgencyInfo;