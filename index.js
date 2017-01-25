import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './containers/app';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import './styles.css';

const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
      <Root />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/app', () => {
    const NewRoot = require('./containers/app').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <NewRoot />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}