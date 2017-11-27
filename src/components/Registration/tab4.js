import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab4 = props => (
    <div className="col-md-12">
        <p>Household Member</p>
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

