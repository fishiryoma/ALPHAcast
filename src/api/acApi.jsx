import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = import.meta.env.VITE_AC_API_URL;
const acApi = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
});

export const register = async (token) => {
  try {
    const { data } = await axios.post(`${baseUrl}api/users`, {
      spotifyToken: token,
    });
    if (data.token) {
      Cookies.set("AC_token", data.token);
    }
    // 測試用
    // console.log(data);
    return data;
  } catch (err) {
    console.error(`Register failed ${err}`);
    throw err;
  }
};

export const getCategory = async () => {
  try {
    const { data } = await acApi.get("api/categories", {
      headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
    });
    console.log(data);
    return data.categories;
  } catch (err) {
    console.log(`Get Categories Failed ${err}`);
  }
};

export const createCategory = async (name) => {
  try {
    const { data } = await acApi.post(
      "api/categories",
      {
        name,
      },
      { headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` } }
    );
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Create Category Failed ${err}`);
    throw err;
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

export const addEpisode = async (id) => {
  try {
    const { data } = await acApi.post("api/episodes", {
      episodeId: id,
    });
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Add Episode Failed ${err}`);
    throw err;
  }
};

export const deleteEpisode = async (id) => {
  try {
    const { data } = await acApi.delete(`api/episodes/${id}`);
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
    throw err;
  }
};

export const addShow = async ({ categryId, showId }) => {
  try {
    const { data } = await acApi.post(`api/categories/${categryId}/shows`, {
      showId,
    });
    console.log(data);
    return data.success;
  } catch (err) {
    console.error(`Add Show Failed ${err}`);
    throw err;
  }
};

export const deleteShow = async ({ categoryId, showId }) => {
  try {
    const { data } =
      await acApi.delete(`api/categories/${categoryId}/shows/${showId}
`);
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Show Failed ${err}`);
  }
};
