import axios from "axios";
import Cookies from "js-cookie";

// //Request User Authorization
const clientId = import.meta.env.VITE_SPOTIFY_ID;
const clientSecert = import.meta.env.VITE_SPOTIFY_SECRET;
const redirectUri = "http://localhost:3000/callback";
const scope = "user-read-private user-read-email";
const authUrl = new URL("https://accounts.spotify.com/authorize");

// 產生隨機數字
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const state = generateRandomString(8);

// 取得Spotify認證code
export const getSpotifyAuth = async () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state,
  });
  const spotifyLoginUrl = `${authUrl}?${params.toString()}`;
  window.location = spotifyLoginUrl;
};

// 取得Spotify Token
export const getAccessToken = async (code) => {
  const url = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(`${clientId}:${clientSecert}`),
  };
  try {
    const { data } = await axios.post(url, params, { headers });
    if (data) {
      Cookies.set("access_token", data.access_token);
      Cookies.set("refresh_token", data.refresh_token);
      // 測試用
      // console.log(data);
      return data.access_token;
    }
  } catch (err) {
    console.error(`Get Access Token Failed ${err}`);
    throw err;
  }
};

// 取得Spotify Refresh Token
export const getRefreshToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", Cookies.get("refresh_token"));
  params.append("client_id", clientId);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(`${clientId}:${clientSecert}`),
  };
  try {
    const { data } = await axios.post(url, params, { headers });
    Cookies.set("access_token", data.access_token);
    // Cookies.set("refresh_token", data.refresh_token);
  } catch (err) {
    console.log(`Get refresh token failed ${err}`);
  }
};

// 取得Spotify個人檔案
export const getProfile = async () => {
  try {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    return data;
  } catch (err) {
    console.log(`get profile failed ${err}`);
  }
};

// Spofity搜尋功能
export const searchShow = async (word) => {
  const url = `https://api.spotify.com/v1/search?q=${word}&type=show`;
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    // console.log(data);
    return data.shows;
  } catch (err) {
    console.error(`Search failed ${err}`);
  }
};

export const getShow = async (id) => {
  const url = `https://api.spotify.com/v1/shows/${id}`;
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.error(`Get show failed ${err}`);
  }
};

export const getEpisodesByShow = async (id) => {
  const url = `https://api.spotify.com/v1/shows/${id}/episodes`;
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.error(`Get Episodes failed ${err}`);
  }
};

export const getEpisodes = async (id) => {
  const url = `https://api.spotify.com/v1/episodes/${id}`;
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
    });
    // console.log(data);
    return data;
  } catch (err) {
    console.error(`Get Episodes failed ${err}`);
  }
};
