import React from 'react';
import styles from './style.scss';
import {stopPropagation} from 'utils/common';

export default class ProcessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatType: 1,
      showSelectPanel: false,
      methodType: 'GET'
    };
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

  onMethodClick() {
    this.setState({
      showSelectPanel: true
    });
  }

  onSelectItemClick(e, type) {
    stopPropagation(e);
    if (type === 'cancle') {
      this.setState({
        showSelectPanel: false
      });
    } else {
      this.setState({
        showSelectPanel: false,
        methodType: type
      });
    }

    if (type === 'GET') {
      this.setState({
        formatType: 1
      });
    }
  }

  buildParamsArea() {
    // x-www-form-urlencode
    if (this.state.formatType === 1) {
      return (
        <div className={styles.table}>
          <div className={styles.tr}>
            <input className={styles.th} disabled="disabled" value="Key" />
            <input className={styles.th} disabled="disabled" value="Value" />
            <div className={styles.th}>操作</div>
          </div>
          <div className={styles.tr}>
            <input className={styles.td} />
            <input className={styles.td} />
            <div className={[styles.td, styles.handler].join(' ')}>
              <div className={styles.btn}>添加</div>
              <div className={styles.btn}>删除</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.formItem}>
          <textarea rows="10" cols="80" className={styles.jsonArea} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="wrap">
        <div className={styles.formItem}>
          <label htmlFor="domain" className={styles.label}>
            接口路径:
          </label>
          <input name="domain" className={styles.input} />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="method" className={styles.label}>
            请求类型:
          </label>
          <div className={styles.methodWrap} onClick={() => this.onMethodClick()} role="presentation">
            <input
              name="method"
              className={[styles.input, styles.method].join(' ')}
              disabled="disabled"
              value={this.state.methodType}
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
          {this.state.methodType === 'POST' && (
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
          <div className={styles.btn}>添加串行流程</div>
          <div className={styles.btn}>添加并行流程</div>
          <div className={styles.btn}>删除流程</div>
        </div>
      </div>
    );
  }
}
