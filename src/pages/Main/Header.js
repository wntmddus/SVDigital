import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import StackedForm from "../Forms/RegularForms/StackedForm";
import { Route, Link } from "react-router-dom";
import * as ROUTES from  '../../routes';
import SignOutButton from "../Authentication/SignOut";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleMobileNavVisibility, authUser } = this.props;
    console.log(authUser);
    console.log(toggleMobileNavVisibility());
    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={() => this.props.toggleMobileNavVisibility()}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </Navbar.Header>

        <Navbar.Collapse>

          <Nav>
            <NavItem><i className="fa fa-dashboard"></i></NavItem>
            <NavDropdown title={<i className="fa fa-globe"/>} id="basic-nav-dropdown">
              <MenuItem>Action</MenuItem>
              <MenuItem>Another action</MenuItem>
              <MenuItem>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <div className="separator"></div>
          <Navbar.Form pullLeft>
            <FormGroup>
              <span className="input-group-addon"><i className="fa fa-search"></i></span>
              <FormControl type="text" placeholder="Type to search"/>
            </FormGroup>
          </Navbar.Form>
          <Nav pullRight>
            <NavItem>Account</NavItem>
            <NavDropdown title="Dropdown" id="right-nav-bar">
              <MenuItem>Action</MenuItem>
              <MenuItem>Another action</MenuItem>
              <MenuItem>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem>Separated link</MenuItem>
            </NavDropdown>
            {!authUser ?
              (<React.Fragment>
                <NavItem componentClass={Link} href={ROUTES.SIGN_UP} to={ROUTES.SIGN_UP}>Sign Up</NavItem>
                <NavItem componentClass={Link} href={ROUTES.SIGN_IN} to={ROUTES.SIGN_IN}>Sign In</NavItem>
              </React.Fragment>) : <SignOutButton/>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
}

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});

export default connect(null, mapDispatchToProp)(Header);
