import axios from "axios";

export default {
  translate(word) {
    let data = {
      q: word,
      source: "en",
      target: "es",
    };

    return new Promise((resolve, reject) => {
      axios
        .post(`https://libretranslate.de/translate`, data)
        .then(function ({ data }) {
          resolve(data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
