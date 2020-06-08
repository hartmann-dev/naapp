class GalleryItem {
  constructor(id, uri, width, height) {
    this.id = id;
    this.uri = uri;
    this.dimensions = { width: width, height: height };
  }
}

export default GalleryItem;
