import { createApi } from "unsplash-js";
import process from "process";

const unsplashAPI = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export default {
  searchByWord(searchWord, page, perPage) {
    return unsplashAPI.search.getPhotos({
      query: searchWord,
      page,
      perPage: perPage || 11,
    });
  },
};
