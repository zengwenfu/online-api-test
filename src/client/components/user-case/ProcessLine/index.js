import React from 'react';
import styles from './style.scss';
import {connect} from 'react-redux';
import actions from 'store/actions';
import {PROCESS_TYPE_SERIAL} from 'utils/constants';

class ProcessLine extends React.Component {
  buildGroupNode(data, current) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      let className = styles.num;
      if (this._index - 1 === current) {
        className = `${className} ${styles.selected}`;
      }
      result.push(
        <div
          className={className}
          key={i + 'group'}
          onClick={(e) => this.onHandlerClick(e)}
          role="presentation"
          num={this._index - 1}
        >
          {this._index}
        </div>
      );
      this._index = this._index + 1;
    }
    return result;
  }

  onHandlerClick(e) {
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
    console.log(processes, nums);
    return nums;
  }

  buildNode() {
    const {currentProcess} = this.props.processData;
    const nums = this.buildNums();
    const result = [];
    this._index = 1;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] instanceof Array) {
        result.push(
          <div className={styles.numGroup} key={i}>
            {this.buildGroupNode(nums[i], currentProcess)}
          </div>
        );
      } else {
        let className = styles.num;
        if (this._index - 1 === currentProcess) {
          className = `${className} ${styles.selected}`;
        }
        result.push(
          <div
            className={className}
            num={this._index - 1}
            key={i}
            onClick={(e) => this.onHandlerClick(e)}
            role="presentation"
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
