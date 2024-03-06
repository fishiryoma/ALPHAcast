import { useEffect, useState } from "react";
import { addEpisode, deleteEpisode } from "../api/acApi";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import useApi from "../contexts/useApi";
import Swal from "sweetalert2";

export default function SpotifyMusicPanel() {
  const { nowPlayingEp } = useApi();

  return (
    <div className="p-4 shadow-sm border-0 bg-white">
      <div className="bg-white">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "2.4rem",
              fontWeight: 500,
              color: "#1A202C",
              margin: 0,
            }}
          >
            現正撥放
          </p>
          <BookMarkBtn id={nowPlayingEp} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111111" }}>
          {nowPlayingEp.epData?.name}
        </div>
        <div style={{ fontSize: "1.2rem", fontWeight: 400, color: "#718096" }}>
          <ShortenText
            text={
              nowPlayingEp.epData?.description
                ? nowPlayingEp.epData?.description
                : ""
            }
            maxLength={300}
          />
        </div>

        <div className="w-full">
          <div id="embed-iframe"></div>
        </div>
      </div>
    </div>
  );
}

function BookMarkBtn() {
  const { favoriteEp, setFavoriteEp, nowPlayingEp } = useApi();
  const [bookMark, setBookMark] = useState(false);

  useEffect(() => {
    if (favoriteEp.some((ep) => ep.id === nowPlayingEp?.id)) setBookMark(true);
  }, [nowPlayingEp]);

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
        const res = await addEpisode(nowPlayingEp?.id);
        if (res) {
          setFavoriteEp([...favoriteEp, { id: nowPlayingEp?.id }]);

          Toast.fire({
            icon: "success",
            html: '<p class="fs-4 fw-bold">成功加入收藏 😊</p>',
          });
        }
      } else {
        const res = await deleteEpisode(nowPlayingEp?.id);
        if (res) {
          setFavoriteEp(
            favoriteEp.filter((item) => item.id !== nowPlayingEp?.id)
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
      {!nowPlayingEp ? (
        ""
      ) : bookMark ? (
        <BsBookmarkFill style={{ color: "#FF7F50", strokeWidth: 0.8 }} />
      ) : (
        <BsBookmark style={{ color: "#FF7F50", strokeWidth: 0.8 }} />
      )}
    </div>
  );
}

function ShortenText({ text, maxLength }) {
  return (
    <div>
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}
