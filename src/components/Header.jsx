import { useEffect, useState } from "react";
import { getProfile } from "../api/spotifyApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <p className="fs-1 fw-bold col-10">
        <Greeting />
      </p>
      <UserProfile />
    </div>
  );
}

function UserProfile() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await getProfile();
        if (res) setUserData([res]);
      } catch (err) {
        console.log(`get profile failed ${err}`);
      }
    };
    getUserProfile();
  }, []);

  return (
    <div
      className="d-flex align-items-center gap-4 justify-space-between px-2 rounded-pill"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <img
        src={
          userData.length && userData[0].images.length
            ? userData[0].images[0].url
            : "iconExample.svg"
        }
        alt="icon"
        className="m-0 rounded-circle"
        style={{ height: "4.8rem", width: "4.8rem" }}
      />
      <div className="d-flex">
        <p className="fs-4">
          {userData.length ? userData[0].display_name : ""}
        </p>
        <LogOutDropDown />
      </div>
    </div>
  );
}

function Greeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "早安";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "午安";
  } else {
    return "晚安";
  }
}

function LogOutDropDown() {
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    Cookies.set("access_token", "");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="Secondary"
        id="dropdown-basic"
      ></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item className="fs-4" onClick={handleClick}>
          登出
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
