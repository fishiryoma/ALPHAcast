import { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { addEpisode, deleteEpisode } from "../../api/acApi";
import PlayBtn from "../PlayBtn";
import useApi from "../../contexts/useApi";
import Swal from "sweetalert2";

export default function EpisodeCard({ episodeData }) {
  return (
    <div className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 ">
      <img
        src={episodeData?.images[1].url}
        style={{ width: "9.6rem", height: "9.6rem" }}
        className="rounded-3"
      />
      <div className="d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-5 fw-bold mt-2">{episodeData?.name}</div>
            <BookMarkBtn episodeData={episodeData} />
          </div>
          <div className="text-gray-500 fs-5 mt-1">
            <ShortenText text={episodeData?.description} maxLength={200} />
          </div>
        </div>
        <div className="mt-3 d-flex gap-3 align-items-center ">
          <PlayBtn id={episodeData.id} epData={episodeData} />
          <p className="text-gray-500 fs-5">
            {episodeData?.release_date}・
            <ConvertToHours ms={episodeData?.duration_ms} />
          </p>
        </div>
      </div>
    </div>
  );
}

function BookMarkBtn({ episodeData }) {
  const { favoriteEp, setFavoriteEp } = useApi();
  const [bookMark, setBookMark] = useState(() =>
    favoriteEp.some((ep) => ep.id === episodeData?.id)
  );

  const handleBookMarkClick = async () => {
    setBookMark(!bookMark);
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
      if (!bookMark) {
        const res = await addEpisode(episodeData?.id);
        if (res) {
          setFavoriteEp([...favoriteEp, { id: episodeData?.id }]);

          Toast.fire({
            icon: "success",
            html: '<p class="fs-4 fw-bold">成功加入收藏 😊</p>',
          });
        }
      } else {
        const res = await deleteEpisode(episodeData?.id);
        if (res) {
          setFavoriteEp(
            favoriteEp.filter((item) => item.id !== episodeData?.id)
          );
          Toast.fire({
            icon: "success",
            html: '<p class="fs-4 fw-bold">成功移除收藏 😊</p>',
          });
        }
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
      Toast.fire({
        icon: "warning",
        html: '<p class="fs-4 fw-bold">發生未知的錯誤 🤔</p>',
      });
    }
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
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}
