import Config from "../constants/Config";
const URL = Config.api_url;

class Gallery {
  constructor({ id, title, image, content, slug }) {
    this.id = id;
    this.title = title;
    this.image = image ? image : undefined;
    this.content = content;
    this.slug = slug;
  }
}

export default Gallery;
