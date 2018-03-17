import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from '../common/side_menu';
import { getBeneDetail } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class BeneficiaryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BeneDetail: [],
        };
    }
    componentDidMount() {
        getBeneDetail(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log(json.records[0])
            this.setState({ BeneDetail: json.records });
        });
    }
    render() {
        console.log(this.state.BeneDetail);
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Beneficiary Detail </p>
                            <hr width="100%" />
                        </div>
                        <div className="content-page">
                            <div className="x_panel">
                                <div className="x_title">
                                    Personal Details
                                    <div className="clearfix" />
                                </div>
                                <div className="x_content" style={{ display: 'block' }} >
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input 
                                                type="text"
                                                className="form-control"
                                                value={this.state.BeneDetail.length > 0 ? this.state.BeneDetail[0].Full_Name__c : ''}
                                                disabled="true" />
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

BeneficiaryDetail.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryDetail);
