import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./loginpage.module.scss";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getSpotifyAuth, getAccessToken } from "../api/auth-spotify";
import LoginCarousel from "../components/LoginCarousel";

function LoginPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken(code);
      if (token) navigate("/home");
    };
    getToken();
  }, [code]);

  useEffect(() => {
    const getToken = () => {
      const urlParams = new URLSearchParams(new URL(window.location).search);
      const spotifyCode = urlParams.get("code");
      if (spotifyCode) {
        localStorage.setItem("spotifyCode", spotifyCode);
        setCode(spotifyCode);
      }
    };
    getToken();
  }, []);

  const handleClick = () => {
    getSpotifyAuth();
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <p className={styles.copyright}>Copyright 2024</p>
        <div className={styles.login_wrap}>
          <img src="../public/logo.png" className={styles.logo} />
          <Button classname="green" onClick={handleClick}>
            使用SPOTIFY帳號登入
          </Button>
          <div className={styles.text_wrap}>
            <span>沒有帳號嗎？</span>
            <a>註冊帳號</a>
          </div>
        </div>
      </div>

      <LoginCarousel />
    </div>
  );
}

export default LoginPage;
