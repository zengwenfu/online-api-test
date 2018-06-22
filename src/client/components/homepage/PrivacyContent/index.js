import React from 'react';
import styles from './style.scss';

class PrivacyContent extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <h2>Privacy Policy for Instaclip</h2>
        <p>
          {`This Privacy Policy governs the manner in which Instaclip collects, uses, maintains and discloses information collected from each user of the Instaclip Application.`}
        </p>
        <h2>Personal identification information</h2>
        <p>{`We don’t collect any personal identification information through the app.`}</p>
        <h2>Non-personal identification information</h2>
        <p>
          {`We may collect non-personal identification information about users whenever they interact with our App. Non-personal identification information may include the type of technical information about user’s means of connection to our App, such as the operating system version and other similar information.`}
        </p>
        <h2>How we use collected information</h2>
        <p>{`Instaclip may collect and use Non-personal information for the following purposes:`}</p>
        <p>
          {`To improve customer service: Information you provide helps us respond to our customer service requests more efficiently.`}
        </p>
        <h2>How we protect your information</h2>
        <p>
          {`We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your information and data collected by our App.`}
        </p>
        <p>
          {`Sensitive and private data exchanged between the App and its users is carried out over a SSL secured communication channel and is encrypted and protected with digital signatures.`}
        </p>
        <h2>Sharing your information</h2>
        <p>{`We do not sell, trade, or rent user’s information to others.`}</p>
        <h2>Changes to this privacy policy</h2>
        <p>
          {`Instaclip has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.`}
        </p>
        <h2>Your acceptance of these terms</h2>
        <p>
          {`By using this App, you signify your acceptance of this policy. If you do not agree to this policy, please feel free to discontinue the use of our App. Your continued use of the App following the changes to this policy will be deemed your acceptance of those changes.`}
        </p>
      </div>
    );
  }
}

export default PrivacyContent;
