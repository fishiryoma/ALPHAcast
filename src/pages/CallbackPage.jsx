import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/spotifyApi";
import { register } from "../api/acApi";
import useAuth from "../contexts/useAuth";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

function CallbackPage() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("callback執行幾次");
    const urlParams = new URLSearchParams(new URL(window.location).search);
    const spotifyCode = urlParams.get("code");
    if (urlParams.get("error")) {
      setTimeout(() => {
        FailMsg("授權註冊失敗");
        navigate("/login");
      }, 1500);
      return;
    }
    if (spotifyCode) {
      localStorage.setItem("spotifyCode", spotifyCode);
      const registerAC = async () => {
        try {
          const spotifyToken = await getAccessToken(spotifyCode);
          const acPermission = await register(spotifyToken);
          if (acPermission.id) {
            setIsAuth(true);
            SuccessMsg("登入或註冊成功");
            setTimeout(() => {
              navigate("/mypage");
            }, 1500);
          }
        } catch (err) {
          console.log(`Register Alphacast Failed ${err}`);
          //第一次請求就成功了，不知道為什麼後續又跳出1次請求失敗的訊息
          console.log("production 測試");
          setTimeout(() => {
            FailMsg("異常😟請重新整理頁面");
          }, 1500);
        }
      };
      registerAC();
    }
  }, [setIsAuth, navigate]);

  return (
    <div className="position-relative">
      <div
        className="position-absolute d-flex flex-column justify-content-center align-items-center w-100"
        style={{
          top: "25vh",
        }}
      >
        <Spinner
          animation="border"
          variant="info"
          className="m-5"
          style={{
            width: "9rem",
            height: "9rem",
            borderWidth: "1.25rem",
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

function SuccessMsg(msg) {
  return Swal.fire({
    title: msg,
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}

function FailMsg(msg) {
  return Swal.fire({
    title: msg,
    icon: "error",
    timer: 1500,
    showConfirmButton: false,
  });
}
