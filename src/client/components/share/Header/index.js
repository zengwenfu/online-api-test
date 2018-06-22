import React from 'react';
import styles from './style.scss';
import {APP_URL, LOGO_URL} from 'utils/constants';
import {checkIsIos} from 'utils/common';
const isIos = checkIsIos();
function Header() {
  return (
    <div className={styles.hWrap}>
      <div className={styles.tWrap}>
        <img src={LOGO_URL} className={styles.logo} />
        <div className={styles.texts}>
          <h2 className={styles.title}>Instaclip</h2>
          <p className={styles.desc}>Send Disappearing Photo Everywhere</p>
        </div>
      </div>
      {isIos && (
        <a className={styles.viewBtn} href={APP_URL}>
          View
        </a>
      )}
    </div>
  );
}

export default Header;
