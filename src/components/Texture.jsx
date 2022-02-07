class Texture {
  constructor(src, w, h) {
    this.image = new Image();
    this.image.src = src;
    this.width = w;
    this.height = h;
  }
}

export default Texture;