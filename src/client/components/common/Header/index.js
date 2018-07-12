import React from 'react';
import styles from './style.scss';
export default class Header extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className="main-content">
          <div className={styles.logoWrap}>
            <img src={require('assets/logo.png')} className={styles.logo} />
            <h2>Facemagic</h2>
            <span className={styles.desc}>在线流程测试工具</span>
          </div>
        </div>
      </div>
    );
  }
}
