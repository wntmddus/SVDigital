import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FirebaseContext } from '../../../components/Firebase';
import { Link, withRouter } from "react-router-dom";
import { compose } from 'recompose';
import { withFirebase } from "../../../components/Firebase";
import * as ROUTES from  '../../../routes';
import renderField from '../../../components/FormInputs/renderField';
import TextInput from '../../../components/FormInputs/TextInput';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters or more';
    }
    return errors;
};

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
    error: null
};

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
const SignUpPage = () => (
    <div className="card">
        <div className="header">
            <h4>Sign Up</h4>
        </div>
        <div className="content">
            <SignUpForm />
        </div>
    </div>
);

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
            submitting: false
        };
    }

    handleSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    // submitting,
    // handleSubmit,
    // submitForm
    render() {
        const {
            email,
            password,
            confirmPassword,
            name,
            phoneNumber,
            error,
            submitting,
        } = this.state;


        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label-email">Email</label>
                    <Field
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        value={email}
                        component={renderField}/>
                </div>

                <div className="form-group">
                    <label className="control-label-password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={password}
                        component={renderField}/>
                </div>
                <div className="form-group">
                    <label className="control-label-confirm-password">Confirm Password</label>
                    <Field
                        name="confirm-password"
                        type="password"
                        onChange={this.onChange}
                        value={confirmPassword}
                        component={renderField}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label-name">Name</label>
                    <Field
                        name="name"
                        type="text"
                        onChange={this.onChange}
                        value={name}
                        component={TextInput}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label-phone-number">Phone Number</label>
                    <Field
                        name="phone-number"
                        type="text"
                        onChange={this.onChange}
                        value={phoneNumber}
                        component={TextInput}
                    />
                </div>
                <button type="submit" className="btn btn-fill btn-info" disabled={submitting}>Submit</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    };
}

const SignUpForm = compose(
    withFirebase,
    withRouter
)(SignUpFormBase);

export default reduxForm({
    form: 'stackedForm',
    validate
})(SignUpPage);

export { SignUpForm, SignUpLink };
