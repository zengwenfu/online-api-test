import React from 'react';
import styles from './style.scss';
import {LOGO_URL} from 'utils/constants';

class Banner extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.iconWrap}>
          <img src={LOGO_URL} />
        </div>
        <div className={styles.desc}>Send a secret message on iMessage or Messenger</div>
        <div className={styles.desc}>Just like Snapchat</div>
        <div className={styles.btn}>Download</div>
      </div>
    );
  }
}

export default Banner;
