import React, {Component} from 'react';
import BasePage from './Layout';
import {Provider} from 'react-redux';

export default class Share extends Component {
  render() {
    const {instaclipState} = this.props;
    return (
      <Provider>
        <BasePage bundleName="share" extend={instaclipState} />
      </Provider>
    );
  }
}
