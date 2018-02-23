import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from './common/side_menu';
import '../../assets/css/themify-icons.css';
import '../../assets/css/portal.css';

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            iconBigStyle: {fontSize: "2.5em", color: "#dd6f25"},
            tableHrStyle: { fontWeight: "bold",backgroundColor: "#818181", height: "0.8px" }
        }
    }
    render () {
        return (
            <div>
               <div className="container body">
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
                                        <div className="col-md-6 icon-big">
                                            <i className="ti-user" style={this.state.iconBigStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Beneficiaries</p>
                                            <p> 1122</p>
                                        </div>
                                        <div className="col-md-12">
                                            <hr style={this.state.tableHrStyle}/>
                                            <p style={{fontSize: "0.6em"}}><i className="fa fa-refresh"></i> Until Today </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-6 icon-big">
                                            <i className="ti-wallet" style={this.state.iconBigStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Funded</p>
                                            <p> 1122</p>
                                        </div>
                                        <div className="col-md-12">
                                            <hr style={this.state.tableHrStyle}/>
                                            <p style={{fontSize: "0.6em"}}><i className="fa fa-refresh"></i> Until Today </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <div className="col-md-6 icon-big">
                                            <i className="ti-pulse" style={this.state.iconBigStyle}></i>
                                        </div>
                                        <div className="col-md-6 numbers">
                                            <p>Applications</p>
                                            <p> 1122</p>
                                        </div>
                                        <div className="col-md-12">
                                            <hr style={this.state.tableHrStyle}/>
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
                                            <hr style={this.state.tableHrStyle}/>
                                        </div>
                                    </div>
                                </div>
                                {/* Post Sec Fund Pane */}
                                <div className="col-md-6">
                                    <div className="x_panel">
                                        <h4> Pri/Sec Fund </h4>
                                        <hr style={this.state.tableHrStyle}/>
                                        
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