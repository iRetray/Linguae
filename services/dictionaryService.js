import axios from "axios";

const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export default {
  searchWord(searchWord) {
    return new Promise((resolve, reject) => {
      axios
        .get(baseURL + searchWord)
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
