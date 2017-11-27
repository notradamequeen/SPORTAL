import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Tab3 = props => (
    <div className="col-md-12">
        <p>Beneficiaries List</p>
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

