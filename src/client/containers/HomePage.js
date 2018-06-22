import React from 'react';
import {connect} from 'react-redux';
import Header from 'components/homepage/Header';
import Nav from 'components/homepage/Nav';
import {Route, withRouter} from 'react-router-dom';
import HomeContent from 'components/homepage/HomeContent';
import PrivacyContent from 'components/homepage/PrivacyContent';
import './common.scss';
import styles from './homePage.scss';
import Footer from 'components/homepage/Footer';

class HomePage extends React.Component {
  render() {
    return (
      <div className="root">
        <Header />
        <Nav />
        <div className={styles.scroller}>
          <Route path="/" component={HomeContent} exact />
          <Route path="/privacy" component={PrivacyContent} />
          <Footer />
        </div>
      </div>
    );
  }
}

function select(state) {
  return state;
}

export default withRouter(connect(select)(HomePage));
