import React from 'react';
import styles from './style.scss';
import {connect} from 'react-redux';

class ProcessLine extends React.Component {
  buildGroupNode(data, current) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      let className = styles.num;
      if (this._index - 1 === current) {
        className = `${className} ${styles.selected}`;
      }
      result.push(
        <div className={className} key={i + 'group'}>
          {this._index}
        </div>
      );
      this._index = this._index + 1;
    }
    return result;
  }

  buildNode() {
    const {nums, currentProcess} = this.props.processData;
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
          <div className={className} key={i}>
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
