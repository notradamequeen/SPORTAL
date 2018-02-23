import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MenuItem from './menu_item';
import '../../../assets/css/portal.css';

class SideMenu extends React.Component {
    render () {
        return (
            <div className="sidenav">
                <div className="col-md-12">
                    <h4 style={{ textAlign: "center"}}>PARTNER PORTAL</h4>
                </div>
                <div className="col-md-12 profile-box">
                    <img src="https://colorlib.com/polygon/gentelella/images/img.jpg" alt="..." className="img-prof" width="200px" height="200px"/>
                </div>
                <div className="col-md-12">
                    <h5 style={{ textAlign: "center"}}>WESTWOOD SECONDARY SCHOOL</h5>
                </div>
                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section active">
                        
                    </div>
                    <MenuItem />
                </div>
            </div>
        )
    }
}

SideMenu.propTypes = {
    title: PropTypes.string,
};
SideMenu.defaultProps = {
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


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);