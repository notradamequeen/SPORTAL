import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab2 = props => (
    <div className="col-md-12">
        <div className="row">
            <p>Personal Details</p>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Name <small>(required)</small></label>
                    <input name="name" id="name" type="text" className="form-control" placeholder="Fullname" />
                </div>
                <div className="form-group">
                    <label>ID Type </label>
                    <select className="form-control valid" aria-invalid="false">
                        <option value="NRIC">NRIC</option>
                        <option value="FIN">FIN</option>
                        <option value="other">Others</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>ID Number <small>(required)</small></label>
                    <input name="nric" id="nric" type="text" className="form-control" placeholder="NRIC / FIN" />
                </div>
                <div className="form-group">
                    <label>Date of Birth </label>
                    <input name="dob" type="text" className="form-control datepicker" placeholder="Date of Birth" />
                </div>
                <div className="form-group">
                    <label>Marital Status </label>
                    <select className="form-control valid" aria-invalid="false">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Marital Status</label>
                    <input name="other4" type="text" className="form-control" placeholder="Please Specify" />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Gender </label>
                    <select className="form-control valid" aria-invalid="false">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Nationality </label>
                    <select className="form-control valid " aria-invalid="false">
                        <option value="Singaporean">Singaporean</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group" >
                    <label>Other Nationality</label>
                    <input name="other1" type="text" className="form-control" placeholder="Please Specify" />
                </div>
                <div className="form-group">
                    <label>Race </label>
                    <select className="form-control valid" aria-invalid="false">
                        <option value="">Select Race</option>
                        <option  value="Chinese">Chinese</option>
                        <option  value="Malay">Malay</option>
                        <option  value="Indian">Indian</option>
                        <option  value="Eurasian">Eurasian</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Race</label>
                    <input name="other1" type="text" className="form-control" placeholder="Please Specify" />
                </div>
            </div>
        </div>

        <div className="row">
            <p>Address</p>	
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Street Name</label>
                    <input type="text" className="form-control" placeholder="5h Avenue" />
                </div>
                <div className="form-group">
                    <label>Street Number</label>
                    <input type="text" className="form-control" placeholder="242" />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" placeholder="New York..."/>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="form-group">
                    <label>Type of Flat  </label>
                    <select className="form-control valid" aria-invalid="false">
                        <option value="room">1 Room HDB flat</option>
                        <option value="room">2 Rooms HDB flat</option>
                        <option value="room">3 Rooms HDB flat</option>
                        <option value="room">4 Rooms HDB flat</option>
                        <option value="interim">Interim Rental Housing (by HDB)</option>
                        <option value="transitional">Transitional Shelter</option>
                        <option value="crisis">Crisis Shelter</option>
                        <option value="homeless">Homeless</option>
                        <option  value="other">Others (Please Specify)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Other Type of Flat</label>
                    <input name="other2" type="text" className="form-control" placeholder="Please Specify"/>
                </div>
                
                <div className="form-group">
                    <label>Country</label>
                    <select name="country" className="form-control">
                        <option value="Singapore"> Singapore </option>
                        <option value="Albania"> Albania </option>
                        <option value="Algeria"> Algeria </option>
                        <option value="American Samoa"> American Samoa </option>
                        <option value="Andorra"> Andorra </option>
                        <option value="Angola"> Angola </option>
                        <option value="Anguilla"> Anguilla </option>
                        <option value="Antarctica"> Antarctica </option>
                        <option value="...">...</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">	
            <p>Personal Contact</p>	
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Home Phone <small>(required)</small></label>
                    <input name="home" type="text" class="form-control" placeholder="Home no." />
                </div>
                <div class="form-group">
                    <label>Mobile Phone</label>
                    <input name="mobile" type="text" class="form-control" placeholder="Mobile no."/>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Email Address </label>
                    <input name="email2" type="text" class="form-control datepicker" placeholder="Email address"/>
                </div>
                <div class="form-group">
                    <label>Urgent Contact </label>
                    <input name="urgent" type="text" class="form-control " placeholder="Urgent contact" />
                </div>
            </div>	
        </div>	
        <div class="row">	
            <div class="col-sm-12">
                <div class="form-group">
                    <label>Reason/s for not having an income earner / Having one income earner:</label>
                    <div class="row col-md-12">
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-1" type="checkbox" value="Alcoholism" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-1">Alcoholism</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-2" type="checkbox" value="Cultural or personal belief" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-2">Cultural or personal belief</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-3" type="checkbox" value="Social Visit Pass" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-3">Social Visit Pass</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-1" type="checkbox" value="Chronic illness" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-1">Chronic illness</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-2" type="checkbox" value="Gambling addiction" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-2">Gambling addiction</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-3" type="checkbox" value="Temporarily unfit for work" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-3">Temporarily unfit for work</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-3" type="checkbox" value="Disability" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-3">Disability</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-3" type="checkbox" value="Low education" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-3">Low education</label>
                        </div>
                        <div class="col-md-4">
                            <label class="custom-option button">
                            <input id="checkbox-able-3" type="checkbox" value="Drug addiction" name="reason[]"/>
                            <span class="button-checkbox"></span>
                            </label>
                            <label for="checkbox-able-3">Drug addiction</label>
                        </div>
                    </div>	
                </div>
                <div class="col-sm-12">
                    <div class="col-md-4">
                        <label>Another Reason</label>
                        <input name="another_reason" type="text" class="form-control" placeholder="Please Specify if exist"/>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
);


Tab2.propTypes = {
    title: PropTypes.string
};
Tab2.defaultProps = {
    title: 'tab2',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab2);

