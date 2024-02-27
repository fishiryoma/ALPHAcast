import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import SpotifyMusicPanel from "../components/SpotifyMusicPanel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../contexts/useApi";

export default function Root() {
  const { myCategory } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (!myCategory.length) {
      navigate("/mypage");
      console.log(myCategory);
    }
  }, [navigate, myCategory]);

  return (
    <div className="main_container">
      <SideBar />
      <div className="px-5">
        <div className="pt-5 pb-4">
          <Header />
        </div>
        <div className="d-flex">
          <div className="col-10">
            <Outlet />
          </div>
          <SpotifyMusicPanel />
        </div>
      </div>
    </div>
  );
}
