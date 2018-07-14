import React from 'react';
import styles from './style.scss';
export default class Header extends React.Component {
  goHome() {
    location.href = '/';
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={[styles.innerWrap, 'main-content'].join(' ')}>
          <div className={styles.logoWrap}>
            <img
              src={require('assets/logo.png')}
              className={styles.logo}
              onClick={() => this.goHome()}
              role="presentation"
            />
            <h2>Facemagic</h2>
            <span className={styles.desc}>在线流程测试工具</span>
          </div>
          <div className={styles.navWra}>
            <a href="/help" className={styles.navItem} target="help">
              帮助
            </a>
            <a className={styles.navItem}>关于</a>
          </div>
        </div>
      </div>
    );
  }
}
