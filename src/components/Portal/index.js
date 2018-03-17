import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from './common/side_menu';
import {AreaChart} from 'react-easy-chart';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Applications from './Applications'
import '../../assets/css/themify-icons.css';
import '../../assets/css/portal.css';

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            iconBigYellowStyle: {fontSize: "2.5em", color: "#ffcc00"},
            iconBigGreenStyle: {fontSize: "2.5em", color: "#77b300"},
            iconBigStyle: {fontSize: "2.5em", color: "#dd6f25"},
            tableHrStyle: { backgroundColor: "#818181", height: "0.6px" },
            chartWidth: 0,
        }
    }
    componentDidMount() {
        this.setState({ chartWidth: this.Chart.getBoundingClientRect().width })
        console.log(this.Chart.getBoundingClientRect().width);
    }
    render () {
        // window.Highcharts = require('highcharts');
        return (
            <div>
               <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Dashboard </p>
                            <hr width="100%"/>
                        </div>
                        <div className="content-page">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-6 icon-big yellow">
                                            <i className="ti-user" style={this.state.iconBigYellowStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Beneficiaries</p>
                                            <h3> 1122</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <hr/>
                                            <p style={{fontSize: "0.6em"}}><i className="fa fa-refresh"></i> Until Today </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-6 icon-big green">
                                            <i className="ti-wallet" style={this.state.iconBigGreenStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Funded</p>
                                            <h3> 1122</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <hr />
                                            <p style={{fontSize: "0.6em"}}><i className="fa fa-refresh"></i> Until Today </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-6 icon-big orange">
                                            <i className="ti-pulse" style={this.state.iconBigStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Applications</p>
                                            <h3> 1122</h3>
                                        </div>
                                        <div className="col-md-12">
                                            <hr />
                                            <p style={{fontSize: "0.6em"}}><i className="fa fa-refresh"></i> Until Today </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* Pri/Sec Fund Pane */}
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-12">
                                            <h4> Pri/Sec Fund </h4>
                                            {/* Disbursement Amount */}
                                            <hr/>
                                            <div className="col-md-6 tb-content">
                                                <p><b> Disburse Amount </b></p>
                                            </div>
                                            <div className="col-md-6 tb-content">
                                                <p> $2120,00 </p>
                                            </div>
                            
                                            {/* Available Amount */}
                                            <hr />
                                            <div className="col-md-6 tb-content">
                                                <p><b> Available Amount </b></p>
                                            </div>
                                            <div className="col-md-6 tb-content">
                                                <p> $2120,00 </p>
                                            </div>
                                            {/* Approved Amount */}
                                            <hr />
                                            <div className="col-md-6 tb-content">
                                                <p><b> Approved Amount </b></p>
                                            </div>
                                            <div className="col-md-6 tb-content">
                                                <p> $2120,00 </p>
                                            </div>
                                            {/* Account Balance */}
                                            <hr />
                                            <div className="col-md-6 tb-content">
                                                <p><b> Account Balance </b></p>
                                            </div>
                                            <div className="col-md-6 tb-content">
                                                <p> $2120,00 </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* Post Sec Fund Pane */}
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <h4> Pri/Sec Fund </h4>
                                        {/* Disbursement Amount */}
                                        <hr/>
                                        <div className="col-md-6 tb-content">
                                            <p><b> Disburse Amount </b></p>
                                        </div>
                                        <div className="col-md-6 tb-content">
                                            <p> $2120,00 </p>
                                        </div>
                        
                                        {/* Available Amount */}
                                        <hr />
                                        <div className="col-md-6 tb-content">
                                            <p><b> Available Amount </b></p>
                                        </div>
                                        <div className="col-md-6 tb-content">
                                            <p> $2120,00 </p>
                                        </div>
                                        {/* Approved Amount */}
                                        <hr />
                                        <div className="col-md-6 tb-content">
                                            <p><b> Approved Amount </b></p>
                                        </div>
                                        <div className="col-md-6 tb-content">
                                            <p> $2120,00 </p>
                                        </div>
                                        {/* Account Balance */}
                                        <hr />
                                        <div className="col-md-6 tb-content">
                                            <p><b> Account Balance </b></p>
                                        </div>
                                        <div className="col-md-6 tb-content">
                                            <p> $2120,00 </p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="x_panel">
                                        <h4> Total Applications</h4>
                                        <p style={{fontSize: "0.6em"}}> Monthly </p>
                                        <div className="col-sm-12" ref={(chart) => { this.Chart = chart; }}>
                                            <AreaChart
                                                xType={'time'}
                                                axes
                                                interpolate={'cardinal'}
                                                width={this.state.chartWidth}
                                                height={250}
                                                areaColors={["#00e6e6", "#008080"]}
                                                data={[
                                                [
                                                    { x: '1-Jan-15', y: 20 },
                                                    { x: '1-Feb-15', y: 10 },
                                                    { x: '1-Mar-15', y: 33 },
                                                    { x: '1-Apr-15', y: 45 },
                                                    { x: '1-May-15', y: 15 }
                                                ], [
                                                    { x: '1-Jan-15', y: 10 },
                                                    { x: '1-Feb-15', y: 15 },
                                                    { x: '1-Mar-15', y: 13 },
                                                    { x: '1-Apr-15', y: 15 },
                                                    { x: '1-May-15', y: 10 }
                                                ]
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            
        );
    }
}

Dashboard.propTypes = {
    title: PropTypes.string,
};
Dashboard.defaultProps = {
    title: 'Hello World',
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);