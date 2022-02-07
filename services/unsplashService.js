import { createApi } from "unsplash-js";
import process from "process";

const unsplashAPI = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export default {
  searchByWord(searchWord) {
    return unsplashAPI.search.getPhotos({ query: searchWord });
  },
};
