import React from 'react';
import styles from './style.scss';
import {APP_URL} from 'utils/constants';

function ErrorTip() {
  return (
    <div className={styles.errorWrap}>
      <p>Oops, The content has expired!</p>
      <br />
      <p>
        Download <a href={APP_URL}>Instaclip</a>,
      </p>
      <br />
      <p>Create your Own Disappearing Content!</p>
    </div>
  );
}

export default ErrorTip;
