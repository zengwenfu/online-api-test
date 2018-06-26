import React from 'react';
import styles from './style.scss';
import ProcessLine from 'components/user-case/ProcessLine';
import ProcessForm from 'components/user-case/ProcessForm';

export default class AddProcess extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={[styles.form, 'main-content'].join(' ')}>
          <div className={styles.globalSet}>
            <h2 className={styles.title}>全局配置</h2>
            <div className={styles.formItem}>
              <label htmlFor="domain" className={styles.label}>
                域名:
              </label>
              <input name="domain" className={styles.input} />
            </div>
          </div>
          <div className={styles.processSet}>
            <h2 className={styles.title}>流程配置</h2>
            <ProcessLine total={5} current={3} />
            <ProcessForm />
          </div>
        </div>
      </div>
    );
  }
}
