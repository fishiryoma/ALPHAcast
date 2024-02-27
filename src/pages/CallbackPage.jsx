import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "../api/spotifyApi";
import { register } from "../api/acApi";
import useAuth from "../contexts/useAuth";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function CallbackPage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyRegisterAC = Cookies.get("AC_token");
    if (alreadyRegisterAC) {
      const loginAC = async () => {
        try {
          const refreshSpotifyToken = await getRefreshToken();
          console.log("callback-1");
          const res = await register(refreshSpotifyToken);
          if (res.token) {
            LoginSuccessMsg();
            setTimeout(() => {
              navigate("/mypage");
            }, 1500);
          }
        } catch (err) {
          console.error(`AC Login failed ${err}`);
          FailMsg();
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      };
      loginAC();
    }

    const toRegister = () => {
      const urlParams = new URLSearchParams(new URL(window.location).search);
      const spotifyCode = urlParams.get("code");
      if (urlParams.get("error")) {
        navigate("/login");
        return;
      }
      if (spotifyCode) {
        localStorage.setItem("spotifyCode", spotifyCode);
        const registerAC = async () => {
          try {
            const spotifyToken = await getAccessToken(spotifyCode);
            const acPermission = await register(spotifyToken);
            if (acPermission.id) {
              RegisterSuccessMsg();
              setTimeout(() => {
                navigate("/mypage");
              }, 1500);
            }
          } catch (err) {
            console.log(`Register Alphacast Failed ${err}`);
            // 第一次註冊失效問題，待上線再做測試
            // console.log("regis---2");
            FailMsg();
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          }
        };
        registerAC();
      }
    };
    if (!isAuth && !alreadyRegisterAC) toRegister();
  }, []);

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
        =
      </div>
    </div>
  );
}

export default CallbackPage;

function RegisterSuccessMsg() {
  return Swal.fire({
    title: "註冊成功",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}

function FailMsg() {
  return Swal.fire({
    title: "登入或註冊失敗，麻煩再試一次",
    icon: "error",
    timer: 1500,
    showConfirmButton: false,
  });
}

function LoginSuccessMsg() {
  return Swal.fire({
    title: "登入成功",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}
