import { createContext, useState, useEffect, useCallback } from "react";
import { register, getCategory } from "../api/acApi";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [myCategory, setMyCategory] = useState([]);
  const [favoriteEp, setFavoriteEp] = useState([]);
  const [nowPlayingEp, setNowPlayingEp] = useState({ id: "" });
  const { isAuth } = useAuth();

  const getFavorite = useCallback(async () => {
    try {
      const res = await register(Cookies.get("access_token"));
      if (res.token) {
        setFavoriteEp(res.favoriteEpisodeIds);
      }
    } catch (err) {
      console.error(`AC Login failed ${err}`);
    }
  }, []);

  const getMyCategory = useCallback(async () => {
    try {
      const res = await getCategory();
      if (res) {
        const sortCategory = res.sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        );
        setMyCategory(sortCategory);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    getFavorite();
    getMyCategory();
  }, [getFavorite, getMyCategory, isAuth]);

  return (
    <ApiContext.Provider
      value={{
        myCategory,
        setMyCategory,
        favoriteEp,
        setFavoriteEp,
        nowPlayingEp,
        setNowPlayingEp,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
export default ApiContext;
