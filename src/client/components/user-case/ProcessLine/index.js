import React from 'react';
import styles from './style.scss';

export default class ProcessLine extends React.Component {
  buildNum() {
    const {total, current} = this.props;
    const result = [];
    for (let i = 1; i <= total; i++) {
      let className = styles.num;
      if (i === current) {
        className = `${className} ${styles.selected}`;
      }
      result.push(
        <div className={className} key={i}>
          {i}
        </div>
      );
    }
    return result;
  }

  render() {
    return <div className={styles.wrap}>{this.buildNum()}</div>;
  }
}
