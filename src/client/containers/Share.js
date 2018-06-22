import React from 'react';
import Header from 'components/share/Header';
import './common.scss';
import Warning from 'components/share/Warning';
import MainCon from 'components/share/Main';
import ErrorTip from 'components/share/ErrorTip';
import ImageView from 'components/share/ImageView';
import {connect} from 'react-redux';
import DownloadTip from 'components/share/DownloadTip';
import VideoPlayer from 'components/share/VideoPlayer';
import {checkShowType, setClipItem} from 'utils/common';
import {GET_API_URL} from 'utils/constants';
import actions from 'store/actions';
import {request} from 'utils/request';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImg: false,
      showDownLoad: false,
      showVideo: false
    };
  }

  onViewClick() {
    const {instaclipState, dispatch} = this.props;
    const obj = {};
    if (this._showType === 'img') {
      obj.showImg = true;
    } else {
      obj.showVideo = true;
      this.refs.videoPlayer.refs.video.play();
    }
    this.setState(obj);
    const options = {
      method: 'post',
      url: GET_API_URL,
      headers: {'Content-Type': 'application/json'},
      data: {
        idStr: instaclipState.resData._id
      }
    };
    request(options).then((data) => {
      setClipItem(instaclipState.resData._id);
      dispatch(actions.setInstclipData(data));
    });
  }

  onFinish() {
    this.setState({
      showDownLoad: true
    });
  }

  componentWillMount() {
    this._showType = false;
  }

  render() {
    const {instaclipState} = this.props;
    if (instaclipState.errCode === 0 && !this._showType) {
      this._showType = checkShowType(instaclipState.resData.type, instaclipState.resData._id);
    }
    return (
      <div className="root">
        <Header />
        <MainCon>
          {this._showType &&
            !this.state.showImg &&
            !this.state.showVideo && (
              <Warning showType={this._showType} data={instaclipState.resData} onViewClick={() => this.onViewClick()} />
            )}
          {!this._showType && <ErrorTip />}
          {this.state.showImg &&
            !this.state.showDownLoad && <ImageView onFinish={() => this.onFinish()} data={instaclipState.resData} />}
          {this.state.showDownLoad && <DownloadTip showType={this._showType} />}
          {!this.state.showDownLoad &&
            this._showType === 'video' && (
              <VideoPlayer
                ref="videoPlayer"
                showVideo={this.state.showVideo}
                onFinish={() => this.onFinish()}
                data={instaclipState.resData}
              />
            )}
        </MainCon>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default connect(select)(Share);
