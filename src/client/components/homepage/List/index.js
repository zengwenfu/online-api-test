import React from 'react';
import styles from './style.scss';


class List extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/smile.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Ephemeral</p>
            <p className={styles.desc}>Self-descructing photo and video after viewed once.</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/atm.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Cross-platform</p>
            <p className={styles.desc}>Support sending through iMessage, WhatsApp, Messenger and even more</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/theme.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Creative</p>
            <p className={styles.desc}>Create your own funny photo and video.</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/theme.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Privacy</p>
            <p className={styles.desc}>Share funny photo and video w/o any worries</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/sound.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Sound Effects</p>
            <p className={styles.desc}>Hear as you click.</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/heart.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Rate</p>
            <p className={styles.desc}>Rate your favorites.</p>
          </div>
        </div>
        <div className={styles.item}>
          <img className={styles.icon} src={require('assets/user.png')} />
          <div className={styles.content}>
            <p className={styles.title}>Free to use</p>
            <p className={styles.desc}>No installaltion or contact import to view the message.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
