import { getSpotifyAuth, getRefreshToken } from "../api/spotifyApi";
import LoginCarousel from "../components/LoginCarousel";
import useAuth from "../contexts/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";

export default function LoginPage() {
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (isAuth) {
        try {
          const spotifyRefreshToken = await getRefreshToken();
          if (spotifyRefreshToken) navigate("/mypage");
          setIsAuth(true);
        } catch (err) {
          setIsAuth(false);
          throw new Error(`取得refresh token失敗${err}`);
        }
      }
    };
    checkToken();
  }, [isAuth, setIsAuth, navigate]);

  const handleClick = () => {
    getSpotifyAuth();
  };

  return (
    <div className="overflow-hidden">
      <div className="row h-100 login">
        <div className="col position-relative d-flex align-items-center justify-content-center vh-100 p-0">
          <p
            className="position-absolute start-50 translate-middle fs-5"
            style={{ bottom: "3rem", color: "#AAAAAA" }}
          >
            Copyright 2024
          </p>
          <div className="d-flex flex-column align-items-center gap-5 w-100">
            <img src={logo} className="" style={{ width: "26rem" }} />
            <button
              className="btn btn-success border-0 p-4 fs-4 border-rounded-lg col-8"
              onClick={handleClick}
              style={{
                backgroundColor: "#1ED760",
                height: "7.3rem",
              }}
            >
              使用SPOTIFY帳號登入
            </button>
            <div className="fs-4">
              <span>沒有帳號嗎？</span>
              <a
                className="fw-bold text-black"
                href="https://www.spotify.com/tw/premium/"
                target="_blank"
                rel="noreferrer noopenner"
              >
                註冊帳號
              </a>
            </div>
          </div>
        </div>
        <div className="col vh-100 p-0">
          <LoginCarousel />
        </div>
      </div>
    </div>
  );
}
