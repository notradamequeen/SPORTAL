import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from '../common/side_menu';
import { getApplicationDetail } from '../services';
import '../../../assets/css/themify-icons.css';
import '../../../assets/css/portal.css';

class ApplicationDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appDetail: [],
        };
    }
    componentDidMount() {
        getApplicationDetail(
            this.props.match.params.personId,
            this.props.user.siteToken.hash,
        ).then(response => response.json()).then((json) => {
            console.log(json.records[0])
            this.setState({ appDetail: json.records });
        });
    }
    render() {
        console.log(this.state.appDetail);
        return (
            <div id="application-detail">
                <div className="container body portal">
                    <div className="main_container">
                        <SideMenu />
                        <div className="content-title">
                            <p className="page_title">Main Applicant </p>
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
                                                value={this.state.appDetail.length > 0 ? this.state.appDetail[0].Applicant_Name__c : ''}
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

ApplicationDetail.propTypes = {
    user: PropTypes.object.isRequired,
    getApplicationDetail: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getApplicationDetail,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
    salesforce: state.salesforce,
});


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);
