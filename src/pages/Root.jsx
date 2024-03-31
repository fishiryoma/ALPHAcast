import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import SpotifyMusicPanel from "../components/SpotifyMusicPanel";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { ApiProvider } from "../contexts/ApiContext";

export default function Root() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  return (
    <ApiProvider>
      <div className="main_container">
        <SideBar />
        <div className="px-5 main_block ">
          <div className="pt-5 pb-4 header">
            <Header />
          </div>
          <div className="d-flex main_display">
            <div className="col-8 card_dsiplay">
              <Outlet />
            </div>
            <SpotifyMusicPanel />
          </div>
        </div>
      </div>
    </ApiProvider>
  );
}
