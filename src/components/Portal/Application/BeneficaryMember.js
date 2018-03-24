import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BeneficaryMember = props => (
    <div className="col-md-3">
        <div className="row">
            <div className="card">
                <div className="x_title">
                    <h4>Beneficiaries </h4>
                    <div className="clearfix" />
                </div>
                {props.beneficaryList.map(appBenItem => (
                    <div>
                        <div className="col-xs-2">
                            <div className="avatar ben">
                                <Link
                                    to={{ pathname: `/portal/beneficiary/${appBenItem.Id}` }}
                                    params={{ personId: appBenItem.Id }}
                                    target="_blank"
                                >
                                    <img
                                        src={require('../../../assets/img/face-1.jpg')}
                                        alt="Circle"
                                        className="img-circle img-no-padding img-responsive"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xs-2">
                            {appBenItem.Application_Status__c === 'Rejected by Partner' ?
                                <h3 style={{ color: 'red' }}><i className="fa fa-times" /></h3> : ''
                            }
                            {appBenItem.Application_Status__c === 'Verified by Partner' ?
                                <h3 style={{ color: 'green' }}><i className="fa fa-check" /></h3> : ''
                            }

                        </div>
                        <div className="col-xs-8">
                            <label> {appBenItem.Full_Name__c} </label>
                            <p> {appBenItem.Application_Status__c}</p>
                        </div>
                        <div className="clearfix" />
                    </div>
                ))}
            </div>
            
        </div>
        <div className="row">
            <div className="x_panel">
                <div className="x_title">
                    <h4>Other HouseHold Member </h4>
                    <div className="clearfix" />
                </div>
                {props.houseHoldList.map(appHouItem => (
                    <div className="x_content" style={{ display: 'block' }} >
                        <div className="col-xs-3">
                            <div className="avatar ben">
                                <Link
                                    to={{ pathname: `/portal/beneficiary/${appHouItem.Id}` }}
                                    params={{ personId: appHouItem.Id }}
                                >
                                    <img
                                        src={require('../../../assets/img/face-0.jpg')}
                                        alt="Circle"
                                        className="img-circle img-no-padding img-responsive"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <label> {appHouItem.Full_Name__c} </label>
                            <p> {appHouItem.Relationship_to_Applicant__c}</p>
                        </div>
                        <div className="col-xs-3">
                            <btn className="btn btn-sm btn-success btn-icon">
                                <i className="fa fa-envelope" />
                            </btn>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    </div>
);

BeneficaryMember.propTypes = {
    beneficaryList: PropTypes.array,
    houseHoldList: PropTypes.array,
};

BeneficaryMember.defaultProps = {
    beneficaryList: [],
    houseHoldList: [],
};

export default BeneficaryMember;
