import React, {Component} from 'react';
import BasePage from './Layout';
import {Provider} from 'react-redux';

export default class About extends Component {
  render() {
    return (
      <Provider>
        <BasePage bundleName="about" />
      </Provider>
    );
  }
}
