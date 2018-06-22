import React from 'react';
import styles from './style.scss';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectI: 0
    };
  }

  onClick(e) {
    const i = e.target.getAttribute('data-i');
    if (i) {
      this.setState({
        selectI: parseInt(i, 10)
      });
    }
  }

  getClassName(i) {
    if (this.state.selectI === i) {
      return [styles.navItem, styles.selected].join(' ');
    } else {
      return styles.navItem;
    }
  }

  render() {
    return (
      <div className={styles.wrap} onClick={(e) => this.onClick(e)} role="presentation">
        <Link to="/">
          <div className={this.getClassName(0)} data-i="0">
            Home
          </div>
        </Link>
        <Link to="/privacy">
          <div className={this.getClassName(1)} data-i="1">
            PRIVACY
          </div>
        </Link>
      </div>
    );
  }
}

export default Nav;
