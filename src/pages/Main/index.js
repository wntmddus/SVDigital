import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase';
import { connect } from 'react-redux';
import cx from 'classnames';
import { AuthUserContext } from '../../components/Session';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withAuthentication } from '../../components/Session';
import { withRouter } from 'react-router-dom';
import * as ROUTES from  '../../routes';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Components from '../Components';
import UserProfile from '../UserProfile';
import MapsPage from '../MapsPage';
import Forms from '../Forms';
import Charts from '../Charts';
import Calendar from '../Calendar';
import Tables from '../Tables';
import SignUpPage from '../Authentication/SignUp';
import SignInPage from '../Authentication/SignIn';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      listener: null,
    }
  }

  componentDidMount() {
    this.state.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
    });
  }
  componentWillMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
    });
  }
  listen() {
    const { hideMobileMenu } = this.props;
    const { mobileNavVisibility,  } = this.state;
    if(mobileNavVisibility) {
      hideMobileMenu();
    }
  }

  render() {
    const { hideMobileMenu, history } = this.props;
    const { mobileNavVisibility,  } = this.state;
    this.listen();
    // history.listen(() => {
    //   if (mobileNavVisibility === true) {
    //     hideMobileMenu();
    //   }
    // });
    return (
      <Router>
        <div className={cx({
          'nav-open': mobileNavVisibility === true
        })}>
          <div className="wrapper">
            <div className="close-layer" onClick={() => this.listen}></div>
              <SideBar/>
              <div className="main-panel">
                <Header authUser={this.state.authUser} />
                <Route exact href={ROUTES.LANDING} path={ROUTES.LANDING} component={Dashboard}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>
                <Route path={ROUTES.SIGN_IN} component={SignInPage}/>
                <Route path="/components" component={Components}/>
                <Route path="/profile" component={UserProfile}/>
                <Route path="/forms" component={Forms}/>
                <Route path="/tables" component={Tables}/>
                <Route path="/maps" component={MapsPage}/>
                <Route path="/charts" component={Charts}/>
                <Route path="/calendar" component={Calendar}/>
                <Footer/>
              </div>
          </div>
        </div>
      </Router>
    )
  };
}

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withAuthentication(connect(mapStateToProp, mapDispatchToProps)(Main));
