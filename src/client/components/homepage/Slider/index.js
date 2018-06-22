import React from 'react';
import styles from './style.scss';

class Slider extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.item}>
          <img src={require('assets/slider1.jpg')} />
        </div>
      </div>
    );
  }
}

export default Slider;
