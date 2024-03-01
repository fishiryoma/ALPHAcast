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
    throw new Error("登入或註冊AlphaCast失敗");
  }
};

export const getCategory = async () => {
  try {
    const { data } = await acApi.get("api/categories", {
      headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
    });
    // 測試用
    // console.log(data);
    return data.categories;
  } catch (err) {
    console.log(`Get Categories Failed ${err}`);
    throw new Error("無法取得使用者分類清單");
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
    // 測試用
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Create Category Failed ${err}`);
    throw new Error("建立新的分類失敗");
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await acApi.delete(`api/categories/${id}`);
    // 測試用
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
    throw new Error("刪除分類失敗");
  }
};

export const editCategory = async ({ id, name }) => {
  try {
    const { data } = await acApi.put(`api/categories/${id}`, { name });
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Edit Category Failed ${err}`);
    throw new Error("編輯分類名稱失敗");
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
    throw new Error("新增Podcast失敗");
  }
};

export const deleteEpisode = async (id) => {
  try {
    const { data } = await acApi.delete(`api/episodes/${id}`);
    // console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
    throw new Error("刪除Podcast失敗");
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
    console.error(`Add Show Failed ${err}`);
    throw new Error("新增節目失敗");
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
    throw new Error("刪除節目失敗");
  }
};
