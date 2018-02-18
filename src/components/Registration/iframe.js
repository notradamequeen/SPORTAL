import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Iframe extends React.Component {

    constructor() {
        super();
        
    }

    submitApp = () => {
        this.props.submitApp();
    }

    render() {
        return (
            <iframe id="ifmcontentstoprint" style={{height: "0px", width: "0px", position: "absolute", pageBreakAfter:"always"}}>
            <p>aaaaa</p>
            </iframe>
        );
    }
}

Iframe.propTypes = {
    title: PropTypes.string
};
Iframe.defaultProps = {
    title: 'tab5 ',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Iframe);