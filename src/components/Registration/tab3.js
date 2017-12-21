import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab3 = props => (
    <div className="col-md-12">
        <h5 className="info-text"> Beneficiaries List</h5>
        <div className="row">
            <p>Beneficiary - 1</p>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Name <small>(required)</small></label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Fullname" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>NRIC</label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Nric " />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input name="cname[]" type="text" className="form-control datepicker" placeholder="Dob" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Current level</label>
                    <select name="current" className="form-control">
                        <option value="Primary"> Primary</option>
                        <option value="Secondary"> Secondary </option>
                        <option value="Polytechnic"> Polytechnic </option>
                        <option value="NITEC"> NITEC </option>
                        <option value="JC"> JC </option>
                    </select>
                </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Email</label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Email" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>School</label>
                    <select name="school" className="form-control">
                        <option value="NorthLight Primary"> NorthLight Primary </option>
                        <option value="Nanyang Secondary"> Nanyang Secondary </option>
                        <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Stream</label>
                    <select name="stream" className="form-control">
                        <option value="Express"> Express</option>
                        <option value="Normal Academic"> Normal Academic </option>
                        <option value="Normal Technical"> Normal Technical </option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Applying to</label>
                    <select name="apply" className="form-control apply1">
                        <option value="NorthLight Primary"> NorthLight Primary </option>
                        <option value="Nanyang Secondary"> Nanyang Secondary </option>
                        <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                        <option value="other"> Other </option>
                    </select>
                </div>
            </div>
            
        </div>
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group">
                    <input type="file" className="form-control-file" id="file1" aria-describedby="fileHelp1" />
                    <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <input type="checkbox" value="1" id="grad1" /> 
                    <label for="grad1">Graduating this year</label>
                </div>
            </div>
        </div>
        <hr />
        <div className="row">
                <p>Beneficiary - 2</p>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Name <small>(required)</small></label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Fullname" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>NRIC</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Nric " />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input name="cname[]" type="text" className="form-control datepicker" placeholder="Dob" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Current level</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Current level" />
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Email</label>
                        <input name="cname[]" type="text" className="form-control" placeholder="Email" />
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>School</label>
                        <select name="school" className="form-control">
                            <option value="NorthLight Primary"> NorthLight Primary </option>
                            <option value="Nanyang Secondary"> Nanyang Secondary </option>
                            <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Stream</label>
                        <select name="stream" className="form-control">
                            <option value="Express"> Express</option>
                            <option value="Normal Academic"> Normal Academic </option>
                            <option value="Normal Technical"> Normal Technical </option>
                        </select>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <label>Applying to</label>
                        <select name="apply" className="form-control apply2">
                            <option value="NorthLight Primary"> NorthLight Primary </option>
                            <option value="Nanyang Secondary"> Nanyang Secondary </option>
                            <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                            <option value="other"> Other </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <div className="form-group">
                        <input type="file" className="form-control-file" id="file2" aria-describedby="fileHelp2" />
                        <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="form-group">
                        <input type="checkbox" value="1" id="grad2" /> 
                        <label for="grad2">Graduating this year</label>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
            <p>Beneficiary - 3</p>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Name <small>(required)</small></label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Fullname" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>NRIC</label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Nric " />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input name="cname[]" type="text" className="form-control datepicker" placeholder="Dob" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Current level</label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Current level" />
                </div>
            </div>
        </div>
        
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Email</label>
                    <input name="cname[]" type="text" className="form-control" placeholder="Email" />
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>School</label>
                    <select name="school" className="form-control">
                        <option value="NorthLight Primary"> NorthLight Primary </option>
                        <option value="Nanyang Secondary"> Nanyang Secondary </option>
                        <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Stream</label>
                    <select name="stream" className="form-control">
                        <option value="Express"> Express</option>
                        <option value="Normal Academic"> Normal Academic </option>
                        <option value="Normal Technical"> Normal Technical </option>
                    </select>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <label>Applying to</label>
                    <select name="apply" className="form-control apply3">
                        <option value="NorthLight Primary"> NorthLight Primary </option>
                        <option value="Nanyang Secondary"> Nanyang Secondary </option>
                        <option value="Temasek Polytechnic"> Temasek Polytechnic </option>
                        <option value="other"> Other </option>
                    </select>
                </div>
            </div>
            
        </div>
        <div className="row">
            <div className="col-sm-3">
                <div className="form-group">
                    <input type="file" className="form-control-file" id="file3" aria-describedby="fileHelp3" />
                    <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="form-group">
                    <input type="checkbox" value="1" id="grad3" /> 
                    <label for="grad3">Graduating this year</label>
                </div>
            </div>
        </div>
        <br />
    </div>
);


Tab3.propTypes = {
    title: PropTypes.string
};
Tab3.defaultProps = {
    title: 'tab2',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab3);

