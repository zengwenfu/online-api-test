const imgSuffix = ',gif,jpg,jepg,png,bmp,';
const headerHeight = 64;
let isIos = -1;
const localStorageClipKey = 'CLIP_ID_KEY';
export function checkShowType(type, id) {
  if (!type) return false;
  if (!id || checkExpireClipItem(id)) return false;
  type = type.toLowerCase();
  return imgSuffix.indexOf(`,${type},`) >= 0 ? 'img' : 'video';
}

export function getMainSize() {
  const mainHeight = document.body.clientHeight - headerHeight;
  const mainWidth = document.body.clientWidth;
  return {
    width: mainWidth,
    height: mainHeight
  };
}

export function setScale(width, height) {
  const mainSize = getMainSize();
  if (width / height >= mainSize.width / mainSize.height) {
    height *= mainSize.width / width;
    width = mainSize.width;
  } else {
    width *= mainSize.height / height;
    height = mainSize.height;
  }
  return {
    width,
    height
  };
}

export function checkIsIos() {
  if (isIos !== -1) return isIos;
  const u = navigator.userAgent;
  isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isIos;
}

export function setClipItem(itemId) {
  if (window) {
    let ids = window.localStorage.getItem(localStorageClipKey);
    if (ids) {
      ids = ids.split(',');
    } else {
      ids = [];
    }
    //最多保存20个，否则重头开始保存
    if (ids.length > 20) {
      ids = [];
    }
    ids.push(itemId);
    window.localStorage.setItem(localStorageClipKey, ids.join(','));
  }
}

export function checkExpireClipItem(itemId) {
  if (window) {
    const ids = window.localStorage.getItem(localStorageClipKey);
    if (ids && ids.indexOf(itemId) >= 0) {
      return true;
    }
    return false;
  }
  return false;
}
