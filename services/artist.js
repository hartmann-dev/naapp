import axios from "./axios";
import Artist from "../models/artist";

let cache = [];

const getArtists = () => {
  // TODO local cache
  if (cache.length > 0) {
    return new Promise((resolve, reject) => {
      resolve(cache);
    });
  }

  return axios.get("/artists").then((response) => {
    return (cache = response.data.map((artist) => {
      return new Artist(
        artist.id,
        artist.name,
        artist.image.url,
        artist.image.width,
        artist.image.height,
        artist.content,
        artist.social,
        artist.artistType.title
      );
    }));
  });
};

export const artistService = {
  getArtists,
};
