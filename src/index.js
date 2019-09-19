import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/base.scss';
import 'sweetalert/dist/sweetalert.css';
import Main from './pages/Main';
import * as serviceWorker from './registerServiceWorker';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
import Firebase, { FirebaseContext } from './components/Firebase';

const store = configureStore();
const rootElement = document.getElementById('root');


const renderApp = Component => {
  ReactDOM.render(
      <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <Component />
        </FirebaseContext.Provider>
      </Provider>,
    rootElement
  );
};

renderApp(Main);
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept('./pages/Main', () => {
    const NextApp = require('./pages/Main').default;
    renderApp(NextApp);
  });
}

registerServiceWorker();

