import React from 'react';
import { withFirebase } from '../../../components/Firebase';
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import * as ROUTES from  '../../../routes';

const SignOutButton = ({ firebase }) => (
    <NavItem componentClass={Link} onClick={firebase.doSignOut} href={ROUTES.LANDING} to={ROUTES.LANDING}>Sign Out</NavItem>
);

export default withFirebase(SignOutButton);
