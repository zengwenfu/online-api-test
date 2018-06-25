import React from 'react';
import styles from './style.scss';

export default class AddProcess extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={[styles.form, 'main-content'].join(' ')}>
          <div className={styles.globalSet}>
            <div className={styles.formItem}>
              <label htmlFor="domain" className={styles.label}>
                域名:
              </label>
              <input name="domain" className={styles.input} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
