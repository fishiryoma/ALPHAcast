import { createContext, useEffect, useState } from "react";
import { register } from "../api/acApi";
import { getRefreshToken } from "../api/spotifyApi";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkTokenIsValid = async () => {
      try {
        if (!Cookies.get("access_token")) {
          setIsAuth(false);
          return;
        }
        const refreshSpotifyToken = await getRefreshToken();
        const res = await register(refreshSpotifyToken);
        if (res.token) {
          setIsAuth(true);
        }
      } catch (err) {
        console.error(`AC Login failed ${err}`);
      }
    };
    checkTokenIsValid();
  }, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
