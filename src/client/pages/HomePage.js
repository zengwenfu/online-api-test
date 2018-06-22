import React, {Component} from 'react';
import BasePage from './Layout';
import {Provider} from 'react-redux';

export default class HomePage extends Component {
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <BasePage bundleName="homePage" />
      </Provider>
    );
  }
}
