import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  // console.log(isAuth);

  useEffect(() => {
    const spotifyToken = Cookies.get("access_token");
    const acToken = Cookies.get("AC_token");
    if (spotifyToken && acToken) setIsAuth(true);
  }, []);

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
