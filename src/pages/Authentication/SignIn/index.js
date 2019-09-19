import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../components/FormInputs/renderField';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../../../components/Firebase';
import * as ROUTES from '../../../routes';

const SignInPage = () => (
    <div className="card">
        <div className="header">
            <h4>Sign In</h4>
        </div>
        <div className="content">
            <SignInForm />
            <SignUpLink />
        </div>
    </div>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};
class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form className="form-horizontal" onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label className="col-md-3 control-label">Email</label>
                    <div className="col-md-9">
                        <Field
                            name="email"
                            type="email"
                            component={renderField}
                            onChange={this.onChange}
                            value={email}
                            label="Email"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-3 control-label">Password</label>
                    <div className="col-md-9">
                        <Field
                            name="password"
                            type="password"
                            component={renderField}
                            onChange={this.onChange}
                            value={password}
                            label="Password"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-3"></label>
                    <div className="col-md-9">
                        <Field
                            name="rememberMe"
                            type="checkbox"
                            component={renderField}
                            label="Remember Me"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-3"></label>
                    <div className="col-md-9">
                        <button type="submit" className="btn btn-fill btn-info">Sign in</button>
                    </div>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default reduxForm({
    form: 'horizontalForm'
})(SignInPage);

export { SignInForm };
