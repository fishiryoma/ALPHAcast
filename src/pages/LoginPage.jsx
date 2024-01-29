import styles from "./loginpage.module.scss";
import { getSpotifyAuth } from "../api/auth-spotify";
import LoginCarousel from "../components/LoginCarousel";
import Button from "../components/Button";

function LoginPage() {
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
