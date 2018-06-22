import React from 'react';
import styles from './style.scss';
import Banner from '../Banner';
import Slider from '../Slider';
import List from '../List';
class HomeContent extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <Banner />
        <Slider />
        <List />
      </div>
    );
  }
}

export default HomeContent;
