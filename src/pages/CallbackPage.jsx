import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/auth-spotify";
import { register, createCategory } from "../api/acApi";

import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

function CallbackPage() {
  const navigate = useNavigate();
  const lists = [
    "通勤清單,star",
    "學習清單,tiger",
    "睡前清單,dog",
    "我的Podcast,door",
    "已收藏,bike",
  ];
  useEffect(() => {
    const getState = () => {
      const urlParams = new URLSearchParams(new URL(window.location).search);
      const spotifyCode = urlParams.get("code");
      if (urlParams.get("error")) navigate("/login");
      if (spotifyCode) {
        localStorage.setItem("spotifyCode", spotifyCode);
        const getSpotifyToken = async () => {
          try {
            await getAccessToken(spotifyCode);
            navigate("/home");
          } catch (err) {
            console.log(`Get Spotify Token Failed ${err}`);
          }
        };

        const registerAC = async () => {
          try {
            await getSpotifyToken();
            const res = await register();
            // 顯示註冊成功再跳轉
            console.log(res);
            if (res.id) {
              Swal.fire({
                title: "註冊成功",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              // await createCategory(lists[0]);
              // await createCategory(lists[1]);
              // await createCategory(lists[2]);
              // await createCategory(lists[3]);

              if (res) setMyCategory();
              navigate("/home");
            }
            if (!res.id) {
              Swal.fire({
                title: "註冊失敗，麻煩再試一次",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
              navigate("/login");
            }
          } catch (err) {
            console.log(`Register Alphacast Failed ${err}`);
          }
        };
        registerAC();
      }
    };
    getState();
  }, []);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "25vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Spinner
          animation="border"
          variant="info"
          style={{
            width: "9rem",
            height: "9rem",
            borderWidth: "1.25rem",
            margin: "5rem",
          }}
        />
        <p
          className="text-info"
          style={{ fontSize: "4rem", fontWeight: 700, letterSpacing: 10 }}
        >
          LOADING...
        </p>
      </div>
    </div>
  );
}

export default CallbackPage;
