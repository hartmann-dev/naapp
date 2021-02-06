import axios from "./axios";
import Artist from "../models/artist";

const getArtists = () => {
  return axios.get("/artists").then((response) => {
    return response.data.map((artist) => {
      return new Artist(
        artist.id,
        artist.name,
        artist.image.formats.large.url,
        artist.image.formats.large.width,
        artist.image.formats.large.height,
        artist.description
      );
    });
  });
};

export const artistService = {
  getArtists,
};
