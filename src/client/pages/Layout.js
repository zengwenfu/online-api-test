import React, {Component} from 'react';
export default class BasePage extends Component {
  render() {
    const {children, bundleName, extend} = this.props;
    const random = RANDOM;
    const isDev = IS_DEV;
    const version = VERSION;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="instaclip description" />
          {extend &&
            extend.resData &&
            extend.resData._id && <meta name="url" content={`https://www.instclip.com/c/${extend.resData._id}`} />}
          {!extend && <meta name="url" content={`https://www.instclip.com`} />}
          <meta name="local" content="en_US" />
          {extend &&
            extend.resData &&
            extend.resData.previewUrl && <meta name="image" content={extend.resData.previewUrl} />}
          <meta name="type" content="website" />
          <meta name="author" content="Touchberry Inc." />
          <meta name="site_name" content="Instaclip" />
          <meta protery="og:title" content="Sent from Instaclip. Will be destroyed after view!" />
          <meta protery="og:description" content="Instaclip description" />
          <meta property="og:site_name" content="Instaclip site_name" />
          {extend &&
            extend.resData &&
            extend.resData._id && <meta property="og:url" content={`https://www.instclip.com/c/${extend.resData._id}`} />}        
          {extend &&
            extend.resData &&
            extend.resData.previewUrl && <meta property="og:image" content={extend.resData.previewUrl} />}
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <title>Sent from Instaclip. Will be destroyed after view</title>
          {!isDev && <link rel="stylesheet" href={`/${bundleName}.css?${random}`} type="text/css" />}
        </head>
        <body>
          <noscript>
            {`If you're seeing this message, that means`}
            <strong>{`JavaScript has been disabled on your browser`}</strong> {`,please`}
            <strong>{`enable JS`}</strong> {`to make this app work.`}
          </noscript>
          <div className="root" id="app">
            {children}
          </div>
          <script src="https://unpkg.com/axios/dist/axios.min.js" />
          <script type="text/javascript" src={`/vendor_${version}.js?`} />
          <script type="text/javascript" src={`/${bundleName}.js?${random}`} />
        </body>
      </html>
    );
  }
}
