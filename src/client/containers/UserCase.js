import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Link} from 'react-router-dom';
import './common.scss';
import styles from './user-case.scss';
import Header from 'components/common/Header';
import AddProcess from 'components/user-case/AddProcess';
import ExcuteProcess from 'components/user-case/ExcuteProcess';
import {getGlobalEvent} from 'utils/eventEmitter';

class UseCase extends React.Component {
  constructor(props) {
    super(props);
    const path = this.props.location.pathname;
    const current = path.indexOf('excute') >= 0 ? 1 : 0;
    this.state = {
      current
    };
  }

  getTabClass(index) {
    if (this.state.current === index) {
      return [styles.tab, styles.selected].join(' ');
    } else {
      return styles.tab;
    }
  }

  onClick(index) {
    this.setState({
      current: index
    });
  }

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
            <Link to="/">
              <div className={this.getTabClass(0)} onClick={() => this.onClick(0)} role="presentation">
                流程配置
              </div>
            </Link>
            <Link to="excute">
              <div className={this.getTabClass(1)} onClick={() => this.onClick(1)} role="presentation">
                流程运行
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.mainContent}>
          <Route path="/" component={AddProcess} exact />
          <Route path="/excute" component={ExcuteProcess} />
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default withRouter(connect(select)(UseCase));
