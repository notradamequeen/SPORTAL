import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab5 = props => (
    <div className="col-md-12">
        <p>Agreement</p>
    </div>
);


Tab5.propTypes = {
    title: PropTypes.string
};
Tab5.defaultProps = {
    title: 'tab5',
};


const mapDispatchToProps = (dispatch)  => ({
    
});

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Tab5);

