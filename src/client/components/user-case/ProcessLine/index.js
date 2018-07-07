import React from 'react';
import styles from './style.scss';
import {connect} from 'react-redux';
import actions from 'store/actions';
import {PROCESS_TYPE_SERIAL, PROCESS_STATUS_DOING, PROCESS_STATUS_FAIL} from 'utils/constants';

class ProcessLine extends React.Component {
  buildGroupNode(data) {
    const showType = this.props.showType || 'add';
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const className = this.getItemClass(this._index - 1);
      result.push(
        <div
          className={className}
          key={i + 'group'}
          onClick={(e) => this.onHandlerClick(e)}
          role="presentation"
          num={this._index - 1}
          style={{cursor: showType === 'add' ? 'pointer' : 'default'}}
        >
          {this._index}
        </div>
      );
      this._index = this._index + 1;
    }
    return result;
  }

  onHandlerClick(e) {
    const showType = this.props.showType || 'add';
    if (showType !== 'add') return;
    const {dispatch} = this.props;
    const num = parseInt(e.target.getAttribute('num'), 10);
    dispatch(actions.setCurrentProcess(num));
  }

  buildNums() {
    const nums = [];
    const {processes} = this.props.processData;
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      if (process.type === PROCESS_TYPE_SERIAL) {
        nums.push(1);
      } else {
        if (nums[nums.length - 1] instanceof Array) {
          nums[nums.length - 1].push(1);
        } else {
          nums[nums.length - 1] = [1, 1];
        }
      }
    }
    return nums;
  }

  getItemClass(index) {
    const {currentProcess, finished} = this.props.processData;
    const showType = this.props.showType || 'add';
    if (showType === 'add') {
      if (index === currentProcess) {
        return [styles.num, styles.selected].join(' ');
      } else {
        return styles.num;
      }
    } else {
      if (!finished[index]) {
        return styles.num;
      } else if (finished[index] === PROCESS_STATUS_DOING) {
        return [styles.num, styles.doing].join(' ');
      } else if (finished[index] === PROCESS_STATUS_FAIL) {
        return [styles.num, styles.fail].join(' ');
      } else {
        return [styles.num, styles.selected].join(' ');
      }
    }
  }

  buildNode() {
    const nums = this.buildNums();
    const result = [];
    this._index = 1;
    const showType = this.props.showType || 'add';
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] instanceof Array) {
        result.push(
          <div className={styles.numGroup} key={i}>
            {this.buildGroupNode(nums[i])}
          </div>
        );
      } else {
        const className = this.getItemClass(this._index - 1);
        result.push(
          <div
            className={className}
            num={this._index - 1}
            key={i}
            onClick={(e) => this.onHandlerClick(e)}
            role="presentation"
            style={{cursor: showType === 'add' ? 'pointer' : 'default'}}
          >
            {this._index}
          </div>
        );
        this._index = this._index + 1;
      }
    }
    return result;
  }

  render() {
    return <div className={styles.wrap}>{this.buildNode()}</div>;
  }
}

function select(state) {
  return state;
}

export default connect(select)(ProcessLine);
