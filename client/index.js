import './style.scss';
import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container'));
