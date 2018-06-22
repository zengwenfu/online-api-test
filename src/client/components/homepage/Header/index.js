import React from 'react';
import styles from './style.scss';
import {LOGO_URL} from 'utils/constants';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <img className={styles.logo} src={LOGO_URL} />
        <div className={styles.title}>Instaclip</div>
      </div>
    );
  }
}

export default Header;
