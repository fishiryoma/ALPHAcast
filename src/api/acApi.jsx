import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = "https://spotify-backend.alphacamp.io/";

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
    const { data } = await axios.get(`${baseUrl}api/categories`, {
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
    const { data } = await axios.post(
      `${baseUrl}api/categories`,
      {
        name,
      },
      { headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` } }
    );
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Create Category Failed ${err}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}api/categories/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("AC_token")}` },
    });
    console.log(data);
    return data.success;
  } catch (err) {
    console.log(`Delete Category Failed ${err}`);
  }
};
