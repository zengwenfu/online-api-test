import React from 'react';
import styles from './style.scss';

class Warning extends React.Component {
  render() {
    const {data, onViewClick, showType} = this.props;
    return (
      <div className={styles.warningWrap}>
        {showType !== 'video' && <p className={styles.tip}>Click Button to View Image, ONLY {Math.round( data.length / 1000 )} Sec!</p>}
        {showType === 'video' && <p className={styles.tip}>Click Button to View, ONLY once!</p>}
        <button className={styles.btn} onClick={onViewClick}>
          {showType === 'video' ? 'Play' : 'View'}
        </button>
      </div>
    );
  }
}

export default Warning;
