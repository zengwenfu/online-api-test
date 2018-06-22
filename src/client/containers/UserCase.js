import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import './common.scss';

class UseCase extends React.Component {
  render() {
    return (
      <div className="root">
        <div>Hello world</div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default withRouter(connect(select)(UseCase));
