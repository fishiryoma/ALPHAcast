import { getSpotifyAuth } from "../api/spotifyApi";
import LoginCarousel from "../components/LoginCarousel";
import useAuth from "../contexts/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return;
    navigate("/mypage");
  }, [isAuth]);

  const handleClick = () => {
    getSpotifyAuth();
  };

  return (
    <div className="overflow-hidden">
      <div className="row h-100">
        <div className="col position-relative d-flex align-items-center justify-content-center">
          <p
            className="position-absolute start-50 translate-middle fs-5"
            style={{ bottom: "3rem", color: "#AAAAAA" }}
          >
            Copyright 2024
          </p>
          <div className="d-flex flex-column align-items-center gap-5">
            <img src="logo.png" className="" style={{ width: "26rem" }} />
            <button
              className="btn btn-success border-0 p-4 fs-4 border-rounded-lg"
              onClick={handleClick}
              style={{
                backgroundColor: "#1ED760",
                width: "42rem",
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
        <div className="col">
          <LoginCarousel />
        </div>
      </div>
    </div>
  );
}
