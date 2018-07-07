import React from 'react';
import styles from './style.scss';
import ProcessLine from 'components/user-case/ProcessLine';
import {connect} from 'react-redux';
import {PROCESS_TYPE_SERIAL, PROCESS_FORMAT_URLENCODE} from 'utils/constants';

class ExcuteProcess extends React.Component {
  parseParams(params) {
    if (!params) return false;
    const result = {};
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (!param.key || param.key === '') continue;
      result[param.key] = param.value;
    }
    return result;
  }

  buildData() {
    const {processData} = this.props;
    const domain = processData.domain;
    const processes = processData.processes;
    if (!domain || domain === '') {
      return false;
    }
    const result = [];
    for (let i = 0; i < processes.length; i++) {
      // const process = processes[i];
      const process = Object.assign({}, processes[i]);
      process.url = `${domain}${process.url}`;
      if (process.formatType === PROCESS_FORMAT_URLENCODE) {
        process.params = this.parseParams(process.params);
        process.json = false;
      } else {
        process.params = false;
      }
      if (process.type === PROCESS_TYPE_SERIAL) {
        result.push(process);
      } else {
        if (result[result.length - 1] instanceof Array) {
          result[result.length - 1].push(process);
        } else {
          result[result.length - 1] = [result[result.length - 1], process];
        }
      }
    }
    return result;
  }

  excute() {
    const data = this.buildData();
    console.log(data);
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <h2 className={styles.title}>已配置流程</h2>
          <ProcessLine showType="excute" />
          <div className={styles.title} style={{marginTop: '10px'}}>
            <h2>执行日志</h2>
            <div className={styles.handlers}>
              <div className={styles.btn} onClick={() => this.excute()} role="presentation">
                开始执行
              </div>
            </div>
          </div>
          <textarea rows="30" cols="80" value={process.json} className={styles.jsonArea} disabled="true" />
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(ExcuteProcess);
