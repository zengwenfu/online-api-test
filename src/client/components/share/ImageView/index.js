import React from 'react';
import styles from './style.scss';
import ImgLoader from 'utils/img-loader';
import Loading from '../Loading';
import {setScale} from 'utils/common';
class ImageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      loaded: false,
      width: 0,
      height: 0
    };
  }

  loadImg() {
    const {data} = this.props;
    if (!data.contentUrl || this.state.finished) return;
    const loader = new ImgLoader(data.contentUrl);
    loader.load().then((data) => {
      this._imgWidth = data.width;
      this._imgHeight = data.height;
      const imgSize = setScale(data.width, data.height);
      this.setState({
        ...imgSize,
        loaded: true
      });
      this.onLoad();
    });
  }

  componentDidMount() {
    if (window) {
      window.onresize = () => {
        if (!this.state.finished) return;
        const imgSize = setScale(this._imgWidth, this._imgHeight);
        this.setState({
          ...imgSize
        });
      };
    }
  }

  onLoad() {
    const {data, onFinish} = this.props;
    const duration = data.length;
    setTimeout(() => {
      this.setState({
        finished: true
      });
      setTimeout(() => {
        onFinish();
      }, 1000);
    }, duration);
  }

  componentDidUpdate() {
    this.loadImg();
  }

  render() {
    const {data} = this.props;
    const style = {width: this.state.width, height: this.state.height};
    if (this.state.loaded) {
      return <img style={style} className={this.state.finished ? styles.fadeOut : styles.img} src={data.contentUrl} />;
    } else {
      return <Loading />;
    }
  }
}

export default ImageView;
