import React from 'react';
import styles from './style.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <p className={styles.copyright}>© Copyright 2018 Touchberry Mobile Inc.</p>
        <p className={styles.support}>Support: support@touchberry.net</p>
        <div className={styles.icons}>
          <img src={require('assets/facebook.png')} className={styles.icon} />
          <img src={require('assets/wechat.png')} className={styles.icon} />
          <img src={require('assets/twitter.png')} className={styles.icon} />
          <img src={require('assets/email.png')} className={styles.icon} />
        </div>
      </div>
    );
  }
}

export default Footer;
