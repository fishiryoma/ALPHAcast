import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/auth-spotify";
import { register, createCategory, getCategory } from "../api/acApi";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

const lists = [
  "通勤清單,star",
  "學習清單,tiger",
  "睡前清單,dog",
  "我的Podcast,door",
  "已收藏,bike",
];

function CallbackPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const getState = () => {
      const urlParams = new URLSearchParams(new URL(window.location).search);
      const spotifyCode = urlParams.get("code");
      if (urlParams.get("error")) navigate("/login");
      if (spotifyCode) {
        localStorage.setItem("spotifyCode", spotifyCode);

        const registerAC = async () => {
          try {
            const res = await getAccessToken(spotifyCode);
            const registerRes = await register(res);
            // 顯示註冊成功再跳轉
            console.log(registerRes);
            if (registerRes.id) {
              Swal.fire({
                title: "註冊成功",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              const res = await getCategory();
              if (!res.length) {
                await createCategory(lists[0]);
                await createCategory(lists[1]);
                await createCategory(lists[2]);
                await createCategory(lists[3]);
                await createCategory(lists[4]);
              }
              setTimeout(() => {
                navigate("/home");
              }, 1500);
            } else {
              Swal.fire({
                title: "註冊失敗，麻煩再試一次",
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
              });
              setTimeout(() => {
                navigate("/login");
              }, 1500);
            }
          } catch (err) {
            console.log(`Register Alphacast Failed ${err}`);
          }
        };
        registerAC();
      }
    };
    getState();
  }, [navigate]);

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
