const helpers = require('./helpers');

const formats = {
  'tall': {
    width: 0.75,
    height: 1,
    style: {
      'standard': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-tall.png`,
      'minimal': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-tall-minimal.png`,
      'transparent': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-tall-transparent.png`
    }
  },
  'wide': {
    width: 4,
    height: 1,
    style: {
      'standard': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-wide.png`,
      'minimal': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-wide-minimal.png`,
      'transparent': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-wide-transparent.png`
    }
  },
  'square': {
    width: 1,
    height: 1,
    style: {
      'standard': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-square.png`,
      'minimal': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-square-minimal.png`,
      'transparent': `${helpers.getIPFSGateway()}/ipns/lib.zesty.market/assets/zesty-banner-square-transparent.png`
    }
  }
}

const defaultFormat = 'square';
const defaultStyle = 'standard';

module.exports = {
  formats,
  defaultFormat,
  defaultStyle
}