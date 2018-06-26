import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import './common.scss';
import styles from './user-case.scss';
import Header from 'components/common/Header';
import AddProcess from 'components/user-case/AddProcess';
import {getGlobalEvent} from 'utils/eventEmitter';

class UseCase extends React.Component {
  onContainerClick() {
    const globalEvent = getGlobalEvent();
    globalEvent.emit('containerClick');
  }

  render() {
    return (
      <div className="root" onClick={() => this.onContainerClick()} role="presentation">
        <Header />
        <div className={styles.tabs}>
          <div className="main-content">
            <div className={[styles.tab, styles.selected].join(' ')}>流程配置</div>
            <div className={styles.tab}>流程运行</div>
          </div>
        </div>
        <div className={styles.mainContent}>
          <AddProcess />
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default withRouter(connect(select)(UseCase));
