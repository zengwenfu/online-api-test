import React from 'react';
import styles from './style.scss';
import Loading from '../Loading';
import {setScale} from 'utils/common';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      canPlay: false,
      width: 1,
      height: 1,
      waiting: false
    };
  }

  onVideoEnd() {
    const {onFinish} = this.props;
    this.setState({
      finished: true
    });
    setTimeout(() => {
      onFinish();
    }, 1000);
  }

  canplaythrough(e) {
    const video = this.refs.video;
    this._videoWidth = video.videoWidth;
    this._videoHeight = video.videoHeight;
    const size = setScale(video.videoWidth, video.videoHeight);
    this.setState({
      canPlay: true,
      ...size
    });
    if (window) {
      window.onresize = () => {
        const size = setScale(this._videoWidth, this._videoHeight);
        this.setState({
          ...size
        });
      };
    }
  }

  onWaiting() {
    this.setState({
      waiting: true
    });
  }

  onPlaying() {
    this.setState({
      waiting: false
    });
  }

  render() {
    const {data, showVideo} = this.props;
    let videoClass = styles.video;
    if (this.state.finished) {
      videoClass = styles.fadeOut;
    } else if (!this.state.canPlay || !showVideo) {
      videoClass = styles.hide;
    }
    const VideoStyle = {
      width: showVideo ? `${this.state.width}px` : '1px',
      height: showVideo ? `${this.state.height}px` : '1px'
    };
    return (
      <div className={styles.videoWrap}>
        <video
          webkit-playsinline="true"
          playsInline="true"
          x-webkit-airplay="allow"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          ref="video"
          style={VideoStyle}
          className={videoClass}
          onWaiting={() => this.onWaiting()}
          onPlaying={() => this.onPlaying()}
          onEnded={() => this.onVideoEnd()}
          onPause={() => this.onVideoEnd()}
          src={data.contentUrl}
          onCanPlayThrough={() => this.canplaythrough()}
        >
          your browser does not support the video tag
        </video>
        {this.state.waiting && <div style={VideoStyle} className={styles.waitBg} />}
        {((!this.state.canPlay && showVideo) || this.state.waiting) && <Loading />}
      </div>
    );
  }
}

export default VideoPlayer;
