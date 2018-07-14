import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './common.scss';
import Header from 'components/common/Header';
import Content from 'components/help/Content';
class UseCase extends React.Component {
  render() {
    return (
      <div className="root">
        <Header />
        <Content />
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default withRouter(connect(select)(UseCase));
