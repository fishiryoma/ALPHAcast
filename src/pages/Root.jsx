import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import SpotifyMusicPanel from "../components/SpotifyMusicPanel";
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

  useEffect(() => {
    console.log("useEffect in Root");
    console.log(document.querySelectorAll(".play"));
    if (document.querySelectorAll(".play").length > 0) {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        const options = {
          uri: `spotify:episode:7makk4oTQel546B0PZlDM5`,
        };
        const element = document.getElementById("embed-iframe");
        const callback = (EmbedController) => {
          console.log(document.querySelectorAll(".play"));
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

  return (
    <div className="main_container">
      <SideBar />
      <div className="px-5">
        <div className="pt-5 pb-4">
          <Header />
        </div>
        <div className="d-flex">
          <div className="col-10">
            <Outlet context={{}} />
          </div>
          <SpotifyMusicPanel />
        </div>
      </div>
    </div>
  );
}
