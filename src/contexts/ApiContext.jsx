import { createContext, useState, useEffect } from "react";
import { register, getCategory } from "../api/acApi";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [myCategory, setMyCategory] = useState([]);
  const [favoriteEp, setFavoriteEp] = useState([]);
  const [nowPlayingEp, setNowPlayingEp] = useState("");
  const { isAuth } = useAuth();

  useEffect(() => {
    const getFavorite = async () => {
      if (isAuth)
        try {
          const res = await register(Cookies.get("access_token"));
          if (res.token) {
            setFavoriteEp([...favoriteEp, ...res.favoriteEpisodeIds]);
          }
        } catch (err) {
          console.error(`AC Login failed ${err}`);
        }
    };
    const getMyCategory = async () => {
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
    };
    getMyCategory();
    getFavorite();
  }, [isAuth]);

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
