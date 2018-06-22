import React from 'react';
import styles from './style.scss';

class MainCon extends React.Component {
  render() {
    const {children} = this.props;
    return <div className={styles.mainCon}>{children}</div>;
  }
}

export default MainCon;
