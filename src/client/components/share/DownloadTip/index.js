import React from 'react';
import styles from './style.scss';
import {APP_URL} from 'utils/constants';
import {checkIsIos} from 'utils/common';
const isIos = checkIsIos();

class VideoPlayer extends React.Component {
  render() {
    const {showType} = this.props;
    if (isIos) {
      return (
        <div className={styles.tipWrap}>
          <p>
            Download <a href={APP_URL}>Instaclip</a>,
          </p>
          <br />
          {showType === 'img' && <p>Create your Own Disappearing Image!</p>}
          {showType === 'video' && <p>Create your Own Disappearing Video!</p>}
        </div>
      );
    } else {
      return <p className={styles.tipWrap}>Thank you</p>;
    }
  }
}

export default VideoPlayer;
