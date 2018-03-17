import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './actions';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: null,
            loading: false,
        };
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        document.body.className = 'login';
    }

    componentWillUnmount() {
        document.body.className = 'nav-md';
    }

    async submit(e) {
        e.preventDefault();
        try {
            this.setState({ error: null, loading: true });
            await this.props.login(this.state.email, this.state.password, this.props.user.siteToken.hash);
            this.setState({ loading: false });
        } catch(error) {
            console.log(error);
            this.setState({ loading: false, error: error.toString() });
        }
    }


    render() {
        if (this.props.user.loggedInUser !== null) return <Redirect to="portal" />;
        return (
            <div>
                <div className="login_wrapper">
                    <div className="animate form login_form">
                        <section className="login_content">
                            <img
                                src="https://www.spmf.org.sg/resources/front/template/spmf/images/logo.png"
                                alt="logo"
                                className="logo"
                                style={{
                                    width: 150,
                                }}
                            />
                            <form onSubmit={this.submit}>
                                <h1>Login Form</h1>
                                <p style={{ textAlign: 'center'}}>
                                    { this.state.loading ? <i className="fa fa-2x fa-spinner fa-spin" /> : null}
                                </p>
                                <div className="alert alert-danger" style={{ display: this.state.error === null ? 'none' : 'block' }}>
                                    {this.state.error ? this.state.error.errorMessage : ''}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        required=""
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        required=""
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <button className="btn btn-default submit" type="submit" onClick={this.submit}>Log in</button>
                                    <Link to="/reset-pwd">Lost your password?</Link>
                                </div>

                                <div className="clearfix" />

                                <div className="separator">
                                    <p className="change_link">New to site?
                                        <a href="#signup" className="to_register"> Create Account </a>
                                    </p>
                                    <div className="clearfix" />
                                    <br />
                                    <div>
                                        <h1><i className="fa fa-heart" /> STSPMF</h1>
                                        <p>&copy; 2017 STSPMF.com.</p>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        login,
    }, dispatch)
);

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
