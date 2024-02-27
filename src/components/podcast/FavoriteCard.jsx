import { useState, useEffect } from "react";
import { getEpisodes } from "../../api/spotifyApi";
import useApi from "../../contexts/useApi";
import PlayBtn from "../PlayBtn";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { deleteEpisode } from "../../api/acApi";

export default function FavoriteCard({ id }) {
  const [epData, setEpData] = useState(null);
  const { nowPlayingEp } = useApi();

  useEffect(() => {
    const getEpData = async () => {
      try {
        const res = await getEpisodes(id);
        // console.log(res);
        if (res) setEpData(res);
      } catch (err) {
        console.error(`Get Episodes failed ${err}`);
      }
    };
    getEpData();
  }, [id]);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 m-1"
      style={{
        outline: `${nowPlayingEp.id === id ? "solid 2px #FF7F50" : ""}`,
      }}
    >
      <img
        src={epData?.images[1].url}
        style={{ width: "9.6rem", height: "9.6rem" }}
        className="rounded-3"
      />
      <div className="d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-5 fw-bold mt-2">{epData?.name}</div>
            {/* <BookMarkBtn handleDeleteFavorite={handleDeleteFavorite} id={id} /> */}
            <BookMarkBtn id={id} />
          </div>
          <div className="text-gray-500 fs-5 mt-1">
            <ShortenText text={epData?.description} maxLength={200} />
          </div>
        </div>
        <div className="mt-3 d-flex gap-3 align-items-center">
          <PlayBtn id={id} epData={epData} />
          <p className="text-gray-500 fs-5">
            {epData?.release_date}・
            <ConvertToHours ms={epData?.duration_ms} />
          </p>
        </div>
      </div>
    </div>
  );
}

function BookMarkBtn({ id }) {
  const [bookMark, setBookMark] = useState(true);
  const { favoriteEp, setFavoriteEp } = useApi();
  const handleDeleteFavorite = async (id) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2500,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    try {
      const res = await deleteEpisode(id);
      if (res) {
        setFavoriteEp(favoriteEp.filter((item) => item.id !== id));
        Toast.fire({
          icon: "success",
          html: '<p class="fs-4 fw-bold">成功移除最愛 😊</p>',
        });
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
      Toast.fire({
        icon: "warning",
        html: '<p class="fs-4 fw-bold">發生未知的錯誤 🤔</p>',
      });
    }
  };

  const handleBookMarkClick = async () => {
    setBookMark(!bookMark);
    handleDeleteFavorite(id);
  };

  return (
    <div
      className="fs-4"
      onClick={handleBookMarkClick}
      style={{ cursor: "pointer" }}
    >
      {bookMark ? (
        <BsBookmarkFill style={{ color: "#FF7F50", strokeWidth: 0.8 }} />
      ) : (
        <BsBookmark style={{ color: "#FF7F50", strokeWidth: 0.8 }} />
      )}
    </div>
  );
}

function ConvertToHours({ ms }) {
  const seconds = Math.floor(ms / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return (
    <>
      {hours} 小時 {minutes} 分
    </>
  );
}

function ShortenText({ text, maxLength }) {
  return (
    <div>
      {text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}
