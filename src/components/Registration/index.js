import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const Registration = props => (
    <div className="container body">
        <div className="">
            <Tabs>
                <TabList>
                    <Tab>Start</Tab>
                    <Tab>Application Profile</Tab>
                    <Tab>Beneficiaries List</Tab>
                    <Tab>Household Member</Tab>
                    <Tab>Agreement</Tab>                    
                </TabList>
        
                <TabPanel>
                    <Tab1 />
                </TabPanel>
                <TabPanel>
                    <Tab2 />
                </TabPanel>
                <TabPanel>
                    <Tab3 />
                </TabPanel>
                <TabPanel>
                    <Tab4 />
                </TabPanel>
                <TabPanel>
                    <Tab5 />
                </TabPanel>
            </Tabs>
        </div>
    </div>
);


Registration.propTypes = {
    title: PropTypes.string,
    logoutUser: PropTypes.func.isRequired,
};
Registration.defaultProps = {
    title: 'Hello World',
};


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        logoutUser,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps, mapDispatchToProps)(Registration);

