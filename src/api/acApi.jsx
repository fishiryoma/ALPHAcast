import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = import.meta.env.VITE_AC_API_URL;
const acApi = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
});

acApi.interceptors.request.use(
  (config) => {
    const token = Cookies.get("AC_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

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
    throw new Error(`登入或註冊AlphaCast失敗 ${err}`);
  }
};

export const getCategory = async () => {
  try {
    const { data } = await acApi.get("api/categories");
    // 測試用
    // console.log(data);
    return data.categories;
  } catch (err) {
    throw new Error(`無法取得使用者分類清單 ${err}`);
  }
};

export const createCategory = async (name) => {
  try {
    const { data } = await acApi.post("api/categories", {
      name,
    });
    // 測試用
    // console.log(data);
    return data.success;
  } catch (err) {
    throw new Error(`建立新的分類失敗 ${err}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await acApi.delete(`api/categories/${id}`);
    // 測試用
    // console.log(data);
    return data.success;
  } catch (err) {
    throw new Error(`刪除分類失敗 ${err}`);
  }
};

export const editCategory = async ({ id, name }) => {
  try {
    const { data } = await acApi.put(`api/categories/${id}`, { name });
    // console.log(data);
    return data.success;
  } catch (err) {
    throw new Error(`編輯分類名稱失敗 ${err}`);
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
    throw new Error(`新增Podcast失敗 ${err}`);
  }
};

export const deleteEpisode = async (id) => {
  try {
    const { data } = await acApi.delete(`api/episodes/${id}`);
    // console.log(data);
    return data.success;
  } catch (err) {
    throw new Error(`刪除Podcast失敗 ${err}`);
  }
};

export const addShow = async ({ categoryId, showId }) => {
  try {
    const { data } = await acApi.post(`api/categories/${categoryId}/shows`, {
      showId,
    });
    // 測試用
    // console.log(data);
    return data.success;
  } catch (err) {
    throw new Error(`新增節目失敗 ${err}`);
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
    throw new Error(`刪除節目失敗 ${err}`);
  }
};
