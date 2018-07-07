import React from 'react';
import styles from './style.scss';
import ProcessLine from 'components/user-case/ProcessLine';
import ProcessForm from 'components/user-case/ProcessForm';
import {connect} from 'react-redux';
import actions from 'store/actions';

class AddProcess extends React.Component {
  constructor(props) {
    super(props);
  }

  setGlobal(e) {
    const {dispatch} = this.props;
    const domain = e.target.value;
    dispatch(actions.setGlobal({domain}));
  }

  setDemo() {
    const {dispatch} = this.props;
    dispatch(actions.setDemoData());
  }

  render() {
    const {processData} = this.props;
    return (
      <div className={styles.wrap}>
        <div className={[styles.form, 'main-content'].join(' ')}>
          <div className={styles.globalSet}>
            <div className={styles.title}>
              <h2>全局配置</h2>
              <div className={styles.handlers}>
                <div className={styles.btn} onClick={() => this.setDemo()} role="presentation">
                  注入Demo
                </div>
              </div>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="domain" className={styles.label}>
                域名:
              </label>
              <input
                name="domain"
                className={styles.input}
                ref="domain"
                value={processData.domain || ''}
                onChange={(e) => this.setGlobal(e)}
              />
            </div>
          </div>
          <div className={styles.processSet}>
            <h2 className={styles.title}>流程配置</h2>
            <ProcessLine />
            <ProcessForm />
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(AddProcess);
