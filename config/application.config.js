const errCode = {
  noErr: 0,

  errOnGetInstaclipData: 1301
};

let httpPort;
let httpsPort;
if (process.env.NODE_ENV === 'development') {
  httpPort = 3000;
  httpsPort = 3001;
} else {
  httpPort = 80;
  httpsPort = 443;
}

const envConfig = {
  httpPort,
  httpsPort,
  nodeEnv: process.env.NODE_ENV
};

const httpsConst = {
  hostNameArray: ['www.instclip.com', 'instclip.com'],
  emailUser: 'sandcforge@gmail.com'
};

const apiConfig = {
  getUrl: 'https://api.instclip.com/instaclip/v1/get',
  getPreview: 'https://api.instclip.com/instaclip/v1/getpreview'
};

module.exports = {
  envConfig,
  httpsConst,
  apiConfig,
  errCode
};
