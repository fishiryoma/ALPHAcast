import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { register } from "../api/acApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [favoriteEp, setFavoriteEp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isRegister = Cookies.get("access_token");
    if (!isRegister) return;
    if (isRegister) {
      const getNewToken = async () => {
        try {
          const res = await register(isRegister);
          if (res.token.length) setIsAuth(true);
          setFavoriteEp(res.favoriteEpisodeIds);
          navigate("/home");
        } catch (err) {
          console.error(`Register failed ${err}`);
          throw err;
        }
      };
      getNewToken();
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuth, favoriteEp, setFavoriteEp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
