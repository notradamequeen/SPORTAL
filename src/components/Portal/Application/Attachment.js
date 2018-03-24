import React from 'react';
import PropTypes from 'prop-types';
import { spmfcloudFunctionUrl } from '../../../actions/salesforces';

const Attachment = props => (
    <div className="col-md-3">
        <div className="row">
            <div className="card">
                <div className="x_title">
                    <h4>Attachment </h4>
                    <div className="clearfix" />
                </div>
                { props.attachmentList.map(attachment => (
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-xs-6" style={{ textAlign: 'center' }}>
                            <i className="fa fa-file fa-3x" />
                        </div>
                        <div className="col-lg-9 col-md-9 col-xs-6">
                            <a href={`${spmfcloudFunctionUrl}/attachment/${attachment.Id}?token=${props.token}`} target="_blank">
                                <p>{attachment.Name} <br /> ({(attachment.BodyLength / 1024).toFixed(2)} KB) </p>
                                <p>{attachment.Description}</p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


Attachment.propTypes = {
    attachmentList: PropTypes.array,
    token: PropTypes.string,
};

Attachment.defaultProps = {
    attachmentList: [],
    token: '',
};

export default Attachment;
