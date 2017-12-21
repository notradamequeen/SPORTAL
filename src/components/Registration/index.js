import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/';
import Stepper from './stepper';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import Tab4 from './tab4';
import Tab5 from './tab5';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Registration extends React.Component {

    constructor() {
        super();
        this.state = {
            steps: [{
            title: 'Start',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 1)
            }
            }, {
            title: 'Application Profile ',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 2)
            }
            }, {
            title: 'Beneficiaries List',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 3)
            }
            }, {
            title: 'Other household members',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 4)
            }
        }, {
            title: 'Agreement',
            href: '#',
            onClick: (e) => {
                e.preventDefault()
                console.log('onClick', 5)
            }
            }],
            currentStep: 0,
            tabIndex: 0
        };
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
    }
    
    onClickNext() {
        const { steps, currentStep , tabIndex} = this.state;
        this.setState({
            currentStep: currentStep + 1,
            tabIndex: tabIndex + 1
        });
    }

    onClickPrev() {
        const { steps, currentStep, tabIndex } = this.state;
        this.setState({
            currentStep: currentStep - 1,
            tabIndex: tabIndex - 1
        });
    }

    render() {
        const { steps, currentStep } = this.state;
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };
        let buttonprev = null;
        let buttonnext = null;
        if (currentStep > 0) {
            buttonprev = <button onClick={ this.onClickPrev } className="btn btn-primary btn-100">Prev</button>;
          } else {
            buttonprev = '';
          }
          if (currentStep == 4) {
            buttonnext = '';
          } else {
            buttonnext = <button onClick={ this.onClickNext } className="btn btn-success btn-100">Next</button>;
          }
       return ( 
        <div className="container body">
            <div className="">
                <Stepper steps={ steps } activeStep={ currentStep } />
                
                <Tabs selectedIndex={this.state.tabIndex}>
            
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
                <br />
                <div className="text-center">
                    {buttonprev}
                    {buttonnext}
                </div>
            </div>
        </div>
       );
    }
 }

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

