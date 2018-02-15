import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import Select from 'react-select';

import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

class Tab3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dob: moment(),
            bencount: 1,
            schoolList: [],
            selectedCS: null,
            selectedAT: null,
            msList: [],
            nationList: [],
            Ben:[{}]
        }
        this.handleInputChange                = this.handleInputChange.bind(this);
        this.handleDOBChange                  = this.handleDOBChange.bind(this);
        this.addCount                         = this.addCount.bind(this);
        this.UpdateBen                        = this.UpdateBen.bind(this);
        this.cs_handleChange                  = this.cs_handleChange.bind(this);
        this.at_handleChange                  = this.at_handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    cs_handleChange(selectedCS, evt) {
        this.setState({ selectedCS, selectedCS });
    }

    at_handleChange(selectedAT) {
        this.setState({ selectedAT });
    }

    inputChangeHandler(event) {
        //this.setState({ [event.target.name]: event.target.value });
        this.props.changeState([event.target.name],event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleInputChange(event) {
        this.props.changeState([event.target.name],event.target.value);
    }

    handleDOBChange(date) {
        var newdate = date.format("YYYY/MM/DD").toString();
        //this.props.changeState('Date_of_Birth__c', date.format("YYYY/MM/DD").toString());
        this.setState({
            dob: newDate
        });
        //console.log( date.format("DD/MM/YYYY"));
        //alert('aaaa');
    }

    componentWillMount(){
        console.log(this.props);
    }

    componentDidMount() {
        const schoolList = []
        if (this.props.salesforce.schoolList.fields.records === undefined) return;
        this.props.salesforce.schoolList.fields.records.map((field) => {
            schoolList.push({type:"school_list", value: field.Id, label: field.Name })
        })
        this.state.schoolList = schoolList

        console.log('props', this.props.data)
    }

    addCount(){
        this.setState({
            bencount: (this.state.bencount+1)
        });
        this.props.data.Ben.push({})
        console.log(this.props.data)
    }

    UpdateBen(event){
        // var data = Array();
        // $(".full").each(function() {
        //     data.push($(this).find('select, textarea, input').serializeArray());
        // })
        // this.props.changeState('Ben', data);
        // console.log(this.props)
        const BenList = this.state.Ben
        BenList[Number(event.target.id.match(/\d+/)[0])][event.target.name] = event.target.value 
        this.setState({ 
            Ben: BenList
        });
        this.props.changeState('Ben', BenList);
        console.log(this.state)
    }


    render() {
        const update = this.UpdateBen.bind(this);
        const dob = this.state.dob;
        const handleDOBChange = this.handleDOBChange.bind(this);
        const cs_handleChange = this.cs_handleChange.bind(this);
        const at_handleChange = this.at_handleChange.bind(this)
        const school_list = this.state.schoolList
        const state = this.state
        const props = this.props
        return (
            <div className="col-md-12" id="tab3">
        <h5 className="info-text"> Beneficiaries List</h5>
        {Array.apply(0, Array(this.state.bencount)).map(function (x, i) {
            return (
            <div className="full">
                <div className="row">
                    <p>Beneficiary - {(i+1)}</p>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Name <small>(required)</small></label>
                                <input
                                    onChange={update}
                                    name="Full_Name__c"
                                    id={`Ben${i}][Full_Name_del__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Fullname"
                                    required
                                />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>NRIC</label>
                                <input
                                    onChange={update}
                                    name="ID_Number__c"
                                    id={`Ben${i}[ID_Number__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="NRIC "
                                />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Date of Birth</label>
                                <DatePicker
                                    name="Date_of_Birth__c"
                                    selected={dob}
                                    id={`Ben${i}[Date_of_Birth__c]`}
                                    dateFormat="DD/MM/YYYY"
                                    onChange={handleDOBChange} 
                                    placeholderText="Date of Birth"
                                    className="form-control fullw"
                                    showYearDropdown
                                    showMonthDropdown
                                />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Current level</label>
                            <select
                                onChange={update}
                                name="Current_Level__c"
                                id={`Ben${i}[Current_Level__c]`}
                                className="form-control"
                            >

                                <option value="Primary 1">Primary 1</option>
                                <option value="Primary 2">Primary 2</option>
                                <option value="Primary 3">Primary 3</option>
                                <option value="Primary 4">Primary 4</option>
                                <option value="Primary 5">Primary 5</option>
                                <option value="Primary 6">Primary 6</option>
                                <option value="Secondary 1">Secondary 1</option>
                                <option value="Secondary 2">Secondary 2</option>
                                <option value="Secondary 3">Secondary 3</option>
                                <option value="Secondary 4">Secondary 4</option>
                                <option value="Secondary 5">Secondary 5</option>
                                <option value="NITEC 1">NITEC 1</option>
                                <option value="NITEC 2">NITEC 2</option>
                                <option value="Higher NITEC">Higher NITEC</option>
                                <option value="Polytechnic 1">Polytechnic 1</option>
                                <option value="Polytechnic 2">Polytechnic 2</option>
                                <option value="Polytechnic 3">Polytechnic 3</option>
                                <option value="JC1">JC1</option>
                                <option value="JC2">JC2</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Email</label>
                                <input
                                    onChange={update}
                                    name="Email_Address__c"
                                    id={`Ben${i}[Email_Address__c]`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>School</label>
                            <select
                                name="Current_School__c" 
                                ref="Ben[{i}][Current_School__c]" 
                                id={`Ben${i}[Current_School__c]`}
                                onChange={update}
                                className="form-control"
                                required>
                                <option value="">---Please Select Current School---</option>
                                {school_list.map((school_opt) => {
                                    return(
                                    <option value={school_opt.value}>{school_opt.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Stream</label>
                            <select
                                onChange={update}
                                name="Stream__c"
                                id={`Ben${i}[Stream__c]`}
                                className="form-control">
                                <option></option>
                                <option value="Express">Express</option>
                                <option value="Normal Academic">Normal Academic</option>
                                <option value="Normal Technical">Normal Technical</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <label>Applying to</label>
                            <select
                                name="Applying_to__c"
                                className="form-control"
                                ref="Ben[{i}][Applying_to__c]" 
                                id={`Ben${i}[Applying_to__c]`}
                                onChange={update}
                                required >
                                <option value="">---Please Select Applying to---</option>
                                {school_list.map((school_opt) => {
                                    return(
                                    <option value={school_opt.value}>{school_opt.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="form-group">
                            <input
                                onChange={update}
                                type="file"
                                className="form-control-file"
                                id="file1"
                                aria-describedby="fileHelp1" />
                            <small id="fileHelp1" className="form-text text-muted">Upload NRIC / FIN, format : jpg, png, pdf only </small>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="form-group">
                            <input
                                onChange={update}
                                type="checkbox"
                                value="1"
                                id="grad1" /> 
                            <label htmlFor="grad1">Graduating this year</label>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
        })}
        <br />
        <center>
            <button onClick={this.addCount} className="btn btn-primary">Add more beneficary</button>
        </center>
        <br />
    </div>)
    }
}

Tab3.propTypes = {
    title: PropTypes.string
};
Tab3.defaultProps = {
    title: 'Tab3 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce
})

export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
