import React, {Component} from 'react';

export default class BasePage extends Component {
  render() {
    const {children, bundleName} = this.props;
    const random = RANDOM;
    const isDev = IS_DEV;
    const version = VERSION;
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Facemagic, facemagic, 菲麦前端, 菲麦，在线流程测试工具，freedomApi" />
          <meta name="author" content="小虫巨蟹" />
          <title>Facemagic, 在线流程测试工具</title>
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
          <script type="text/javascript" src={`/vendor_${version}.js?`} />
          <script type="text/javascript" src={`/${bundleName}.js?${random}`} />
          <script src="https://s4.cnzz.com/z_stat.php?id=1261341438&web_id=1261341438" language="JavaScript" />
        </body>
      </html>
    );
  }
}
