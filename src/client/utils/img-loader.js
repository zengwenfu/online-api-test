class ImgLoader {
  constructor(imgUrl) {
    this._imgUrl = imgUrl;
  }

  load() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = this._imgUrl;
      img.onload = () => {
        this._width = img.width;
        this._height = img.height;
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onabort = img.onerror = () => {
        resolve(false);
      };
    });
  }

  getSize() {
    return {
      width: this._width,
      height: this._height
    };
  }
}

export default ImgLoader;
