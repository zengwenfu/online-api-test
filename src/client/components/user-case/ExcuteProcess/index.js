import React from 'react';
import styles from './style.scss';
import ProcessLine from 'components/user-case/ProcessLine';
import {connect} from 'react-redux';
import {PROCESS_TYPE_SERIAL, PROCESS_FORMAT_URLENCODE} from 'utils/constants';
import {sendProcess} from 'utils/ws-conn';
import actions from 'store/actions';

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
      process.index = i;
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
    const {dispatch} = this.props;
    dispatch(actions.resetRequest());
    sendProcess(data, dispatch);
  }

  buildObjItem(obj) {
    const result = [];
    for (const key in obj) {
      result.push(
        <p key={key}>
          {key}: {JSON.stringify(obj[key])}
        </p>
      );
    }
    return result;
  }

  buildClipItem(title, obj, i, isBody = false) {
    return (
      <div className={styles.itemWrap} key={i}>
        <h3>{title}</h3>
        {!isBody && this.buildObjItem(obj)}
        {isBody && <p>{JSON.stringify(obj)}</p>}
      </div>
    );
  }

  buildLog() {
    const {results, processes} = this.props.processData;
    const obj = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      console.log(result);
      const name = processes[result.index].name;
      if (result.options) {
        const title = `流程（${name}）请求参数:`;
        obj.push(this.buildClipItem(title, result.options, i));
      } else if (result.data) {
        const hTitle = `流程（${name}）响应 Header:`;
        obj.push(this.buildClipItem(hTitle, result.data.headers, `h${i}`));
        const bTitle = `流程（${name}）响应 Body:`;
        obj.push(this.buildClipItem(bTitle, result.data.body, `b${i}`, true));
      }
    }
    return obj;
  }

  componentDidMount() {
    this._logScrollHeight = 0;
  }

  componentDidUpdate() {
    const logCon = this.refs.logCon;
    const scrollHeight = logCon.scrollHeight;
    if (scrollHeight > this._logScrollHeight) {
      logCon.scrollTop = scrollHeight;
      this._logScrollHeight = scrollHeight;
    }
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
          {/* <textarea rows="30" cols="80" value={process.json} className={styles.jsonArea} disabled="true" /> */}
          <div ref="logCon" className={styles.logCon}>
            {this.buildLog()}
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(ExcuteProcess);
