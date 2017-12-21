import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab4 = props => (
    <div className="col-md-12">
        <h5 className="info-text">Other household members</h5>
            <div className="row">
                <p>Member - 1</p>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Name <small>(required)</small></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Fullname" /> 
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>NRIC</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Nric " />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Relationship to Applicant</label>
                        <select name="cname[]" className="form-control relation1">
                            <option value="Father"> Father </option>
                            <option value="Mother"> Mother </option>
                            <option value="Son"> Son </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Age</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Age" />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Gross Monthly Income <a href="#" data-toggle="tooltip" title="The gross household income of the individual"><img src="assets/img/question.png" width="15px" /></a></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Montly Income" />
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mla1" aria-describedby="fh1" />
                        <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format: jpg, png, pdf only </small>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mlb1" aria-describedby="gh1" />
                        <small id="gh1" className="form-text text-muted">Income Statement Receipt,  format: jpg, png, pdf only </small>
                    </div>
                </div>
            </div>
            
            <hr />
            <div className="row">
                <p>Member - 2</p>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Name <small>(required)</small></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Fullname" />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>NRIC</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Nric " />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Relationship to Applicant</label>
                        <select name="cname[]" className="form-control relation2">
                            <option value="Father"> Father </option>
                            <option value="Mother"> Mother </option>
                            <option value="Son"> Son </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Age</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Age" /> 
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Gross Monthly Income <a href="#" data-toggle="tooltip" title="The gross household income of the individual"><img src="assets/img/question.png" width="15px" /></a></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Montly Income" />
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mla2" aria-describedby="fh2" />
                        <small id="fh2" className="form-text text-muted">Upload NRIC / FIN,  format: jpg, png, pdf only </small>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mlb2" aria-describedby="gh2" />
                        <small id="gh2" className="form-text text-muted">Income Statement Receipt,  format: jpg, png, pdf only</small>
                    </div>
                </div>
            </div>
            
            <hr />
            <div className="row">
                <p>Member - 3</p>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Name <small>(required)</small></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Fullname" />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>NRIC</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Nric "/>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Relationship to Applicant</label>
                        <select name="cname[]" className="form-control relation3">
                            <option value="Father"> Father </option>
                            <option value="Mother"> Mother </option>
                            <option value="Son"> Son </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Age</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Age" />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <label>Gross Monthly Income <a href="#" data-toggle="tooltip" title="The gross household income of the individual"><img src="assets/img/question.png" width="15px" /></a></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Montly Income" />
                    </div>
                </div>
                
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mla3" aria-describedby="fh3" />
                        <small id="fh3" className="form-text text-muted">Upload NRIC / FIN,  format: jpg, png, pdf only </small>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="mlb3" aria-describedby="gh3" />
                        <small id="gh3" className="form-text text-muted">Income Statement Receipt,  format: jpg, png, pdf only</small>
                    </div>
                </div>
            </div>
            <div className="row">	
                <div className="col-sm-12">
                    <div className="form-group">
                        <label>Reason/s for not having an income earner / Having one income earner:</label>
                        <div className="row col-md-12">
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-1" type="checkbox" value="Alcoholism" name="reason[]" /> 
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-1">Alcoholism</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-2" type="checkbox" value="Cultural or personal belief" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-2">Cultural or personal belief</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-3" type="checkbox" value="Social Visit Pass" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Social Visit Pass</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-1" type="checkbox" value="Chronic illness" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-1">Chronic illness</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-2" type="checkbox" value="Gambling addiction" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-2">Gambling addiction</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-3" type="checkbox" value="Temporarily unfit for work" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Temporarily unfit for work</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-3" type="checkbox" value="Disability" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Disability</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-3" type="checkbox" value="Low education" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Low education</label>
                            </div>
                            <div className="col-md-4">
                                <label className="custom-option button">
                                <input id="checkbox-able-3" type="checkbox" value="Drug addiction" name="reason[]" />
                                <span className="button-checkbox"></span>
                                </label>
                                <label for="checkbox-able-3">Drug addiction</label>
                            </div>
                        </div>	
                    </div>
                    <div className="col-sm-12">
                        <div className="col-md-4">
                            <label>Another Reason</label>
                            <input name="another_reason" type="text" className="form-control" placeholder="Please Specify if exist" />
                        </div>
                    </div>
                </div>
            </div>
    </div>
);


Tab4.propTypes = {
    title: PropTypes.string
};
Tab4.defaultProps = {
    title: 'tab4',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab4);

