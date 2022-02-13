import axios from "axios";

const baseURL = "https://libretranslate.de/translate";

const defaultHeaders = {
  source: "en",
  target: "es",
};

export default {
  translate(word) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL, { ...defaultHeaders, q: word })
        .then(({ status, data }) => {
          if (status === 200) {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
