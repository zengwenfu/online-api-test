import React from 'react';
import styles from './style.scss';

class Content extends React.Component {
  render() {
    return (
      <div className={[styles.wrap, 'main-content'].join(' ')}>
        <div className={styles.concatItems}>
          <div className={styles.item}>
            <img src="http://h5.facemagic888.com/client/images/qrcode.jpg" />
            <div className={styles.title}>公众号</div>
            <div className={styles.desc}>要么不更新，有么走心...</div>
          </div>
          <div className={styles.item}>
            <img src={require('assets/qrcode.png')} />
            <div className={styles.title}>小圈圈</div>
            <div className={styles.desc}>这里个个都是人才，说话又好听，超喜欢这里的...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
