import React from 'react';
import styles from './style.scss';
import {stopPropagation} from 'utils/common';
import {getGlobalEvent} from 'utils/eventEmitter';
import {connect} from 'react-redux';
import actions from 'store/actions';

class ProcessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatType: 1, // 1 x-www-url-encode 2 json
      showSelectPanel: false // switch select panel
    };
  }

  onContainerClick() {
    this.setState({
      showSelectPanel: false
    });
  }

  componentDidMount() {
    const globalEvent = getGlobalEvent();
    globalEvent.on('containerClick', this.onContainerClick.bind(this));
  }

  componentWillUnmount() {
    const globalEvent = getGlobalEvent();
    globalEvent.off('containerClick', this.onContainerClick);
  }

  getRadioClassName(value) {
    const classes = [styles.radio];
    if (this.state.formatType === value) {
      classes.push(styles.checked);
    }
    return classes.join(' ');
  }

  onRadioClick(value) {
    this.setState({
      formatType: value
    });
  }

  onMethodClick(e) {
    stopPropagation(e);
    this.setState({
      showSelectPanel: true
    });
  }

  onSelectItemClick(e, type) {
    stopPropagation(e);
    this.setState({
      showSelectPanel: false
    });
    if (type === 'cancle') {
      return;
    } else {
      const {dispatch} = this.props;
      dispatch(actions.setProcessMethod({method: type}));
    }

    if (type === 'GET') {
      this.setState({
        formatType: 1
      });
    }
  }

  addRow() {
    const {dispatch} = this.props;
    dispatch(actions.addRow());
  }

  deleteRow(i) {
    const {dispatch} = this.props;
    dispatch(actions.deleteProcessParam({row: i}));
  }

  onChange(e, i, type) {
    const {dispatch} = this.props;
    dispatch(actions.setProcessParam({row: i, type, value: e.target.value}));
  }

  getParamRows() {
    const {processData} = this.props;
    return processData.processes[processData.currentProcess].params;
  }

  buildParamsRow() {
    const result = [];
    const paramsRows = this.getParamRows();
    for (let i = 0; i < paramsRows.length; i++) {
      const item = paramsRows[i];
      result.push(
        <div className={styles.tr} key={i}>
          <input className={styles.td} value={item.key || ''} onChange={(e) => this.onChange(e, i, 'key')} />
          <input className={styles.td} value={item.value || ''} onChange={(e) => this.onChange(e, i, 'value')} />
          <div className={[styles.td, styles.handler].join(' ')}>
            <div className={styles.btn} onClick={() => this.addRow()} role="presentation">
              添加
            </div>
            <div className={styles.btn} onClick={() => this.deleteRow(i)} role="presentation">
              删除
            </div>
          </div>
        </div>
      );
    }
    return result;
  }

  onJsonChange(e) {
    const {dispatch} = this.props;
    dispatch(actions.setProcessParamJson({json: e.target.value}));
  }

  buildParamsArea() {
    const process = this.getProcess();
    // x-www-form-urlencode
    if (this.state.formatType === 1) {
      return (
        <div className={styles.table}>
          <div className={styles.tr}>
            <input className={styles.th} disabled="disabled" value="Key" />
            <input className={styles.th} disabled="disabled" value="Value" />
            <div className={styles.th}>操作</div>
          </div>
          {this.buildParamsRow()}
        </div>
      );
    } else {
      return (
        <div className={styles.formItem}>
          <textarea
            rows="10"
            cols="80"
            value={process.json}
            className={styles.jsonArea}
            onChange={(e) => this.onJsonChange(e)}
          />
        </div>
      );
    }
  }

  getProcess() {
    const {processData} = this.props;
    return processData.processes[processData.currentProcess];
  }

  setUrl(e) {
    const {dispatch} = this.props;
    dispatch(actions.setProcessUrl({url: e.target.value}));
  }

  addProcess(type) {
    const {dispatch} = this.props;
    dispatch(actions.addProcess({type}));
  }

  deleteProcess() {
    const {dispatch} = this.props;
    dispatch(actions.deleteProcess());
  }

  render() {
    const process = this.getProcess();
    return (
      <div className="wrap">
        <div className={styles.formItem}>
          <label htmlFor="api" className={styles.label}>
            接口路径:
          </label>
          <input name="api" className={styles.input} value={process.url || ''} onChange={(e) => this.setUrl(e)} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="method" className={styles.label}>
            请求类型:
          </label>
          <div className={styles.methodWrap} onClick={(e) => this.onMethodClick(e)} role="presentation">
            <input
              name="method"
              className={[styles.input, styles.method].join(' ')}
              disabled="disabled"
              value={process.method || 'GET'}
            />
            {this.state.showSelectPanel && (
              <div className={styles.selects}>
                <div
                  className={styles.selectItem}
                  onClick={(e) => this.onSelectItemClick(e, 'POST')}
                  role="presentation"
                >
                  POST
                </div>
                <div
                  className={styles.selectItem}
                  onClick={(e) => this.onSelectItemClick(e, 'GET')}
                  role="presentation"
                >
                  GET
                </div>
                <div
                  className={styles.selectItem}
                  onClick={(e) => this.onSelectItemClick(e, 'cancle')}
                  role="presentation"
                >
                  取消
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.paramsWrap}>
          <label className={styles.label}>请求参数:</label>
          {process.method === 'POST' && (
            <div className={styles.formatType}>
              <div className={styles.radioWrap} onClick={() => this.onRadioClick(1)} role="presentation">
                <div className={this.getRadioClassName(1)} name="formatType" />
                <p className={styles.ftDesc}>x-www-form-urlencoded</p>
              </div>
              <div className={styles.radioWrap} onClick={() => this.onRadioClick(2)} role="presentation">
                <div className={this.getRadioClassName(2)} name="formatType" value="2" />
                <p className={styles.ftDesc}>json</p>
              </div>
            </div>
          )}
          {this.buildParamsArea()}
        </div>
        <div className={styles.btns}>
          <div className={styles.btn} onClick={() => this.addProcess(0)} role="presentation">
            添加串行流程
          </div>
          <div className={styles.btn} onClick={() => this.addProcess(1)} role="presentation">
            添加并行流程
          </div>
          <div className={styles.btn} onClick={() => this.deleteProcess()} role="presentation">
            删除流程
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(ProcessForm);
