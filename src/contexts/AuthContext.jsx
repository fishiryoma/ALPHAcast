import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const isRegister = Cookies.get("AC_token");
    if (!isRegister) return;
    if (isRegister) {
      setIsAuth(true);
      navigate("/home");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
