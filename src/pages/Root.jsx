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
    if (document.querySelectorAll(".play").length > 0) {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const options = {
          uri: `spotify:episode:7makk4oTQel546B0PZlDM5`,
        };
        const element = document.getElementById("embed-iframe");
        const callback = (EmbedController) => {
          // 測試用
          // console.log(document.querySelectorAll(".play"), "初始化進行");
          document.querySelectorAll(".play").forEach((episode) => {
            episode.addEventListener("click", () => {
              EmbedController.loadUri(episode.dataset.spotifyId);
              EmbedController.play();
            });
          });
          document.querySelectorAll(".pause").forEach((episode) => {
            episode.addEventListener("click", () => {
              EmbedController.togglePlay();
            });
          });
        };
        IFrameAPI.createController(element, options, callback);
      };
    }
  });

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate, isAuth]);

  return (
    <ApiProvider>
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
    </ApiProvider>
  );
}
