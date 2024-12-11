import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api
    .post("/posts/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  uploadImage,
};
