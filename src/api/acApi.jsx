import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = "https://spotify-backend.alphacamp.io/";
const acApi = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
});

export const register = async () => {
  const token = Cookies.get("access_token");
  try {
    const { data } = await axios.post(`${baseUrl}api/users`, {
      spotifyToken: token,
    });
    if (data.token.length) {
      Cookies.set("AC_token", data.token);
    }
    console.log(data);
    return data;
  } catch (err) {
    console.log(`Register failed ${err}`);
  }
};

export const getCategory = async () => {
  try {
    const { data } = await acApi.get("api/categories");
    console.log(data);
    return data.categories;
  } catch (err) {
    console.log(`Get Categories Failed ${err}`);
  }
};

export const createCategory = async (name) => {
  try {
    const { data } = await acApi.post("api/categories", {
      name,
    });
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Create Category Failed ${err}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await acApi.delete(`api/categories/${id}`);
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
  }
};

export const editCategory = async ({ id, name }) => {
  try {
    const { data } = await acApi.put(`api/categories/${id}`, { name });
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Edit Category Failed ${err}`);
  }
};

export const addEpisode = async ({ id }) => {
  try {
    const { data } = await acApi.post("api/episodes", {
      id,
    });
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Add Episode Failed ${err}`);
  }
};

export const deleteEpisode = async (id) => {
  try {
    const { data } = await acApi.delete(`api/episodes/${id}`);
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
  }
};
