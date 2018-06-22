import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './containers/HomePage';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import {createStore} from 'redux';
import {HashRouter} from 'react-router-dom';

// 通过服务端注入的全局变量得到初始 state
const preloadedState = window.__INITIAL_STATE__;

// 使用初始 state 创建 Redux store
const store = createStore(reducer, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <HomePage />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
