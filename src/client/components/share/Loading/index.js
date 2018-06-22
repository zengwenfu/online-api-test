import React from 'react';
import styles from './style.scss';

class Loading extends React.Component {
  render() {
    const text = this.props.text || 'Clip Loading...';
    return (
      <div className={styles.loadingWrap}>
        <img src={require('assets/loading.png')} className={styles.loading} />
        <p className={styles.loadingText}>{text}</p>
      </div>
    );
  }
}

export default Loading;
