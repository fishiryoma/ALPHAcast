import { useEffect, useState } from "react";
import { addEpisode, deleteEpisode } from "../api/acApi";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import useApi from "../contexts/useApi";
import { bottomMsg_s } from "./PopupMsg";

export default function SpotifyMusicPanel() {
  const { nowPlayingEp } = useApi();

  return !nowPlayingEp.id.length ? (
    ""
  ) : (
    <>
      <div
        className="p-4 shadow-sm border-0 bg-white"
        // style={{ width: "300rem" }}
      >
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
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#111111",
            }}
          >
            {nowPlayingEp.epData?.name}
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "#718096",
            }}
          >
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
            <div id="spotifyPlayer">
              <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/episode/${nowPlayingEp.id}?utm_source=generator`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BookMarkBtn() {
  const { favoriteEp, setFavoriteEp, nowPlayingEp } = useApi();
  const [bookMark, setBookMark] = useState(null);

  const handleBookMarkClick = async () => {
    setBookMark(!bookMark);

    try {
      if (!bookMark) {
        const res = await addEpisode(nowPlayingEp?.id);
        if (res) {
          setFavoriteEp([...favoriteEp, { id: nowPlayingEp?.id }]);
          bottomMsg_s("成功加入收藏 😊");
        }
      } else {
        const res = await deleteEpisode(nowPlayingEp?.id);
        if (res) {
          setFavoriteEp(
            favoriteEp.filter((item) => item.id !== nowPlayingEp?.id)
          );
          bottomMsg_s("成功移除收藏 😊");
        }
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
      bottomMsg_s("發生未知的錯誤 🤔", "warning");
    }
  };

  useEffect(() => {
    const isInFavorite = favoriteEp.some((ep) => ep.id === nowPlayingEp?.id);
    if (isInFavorite) {
      setBookMark(true);
    } else setBookMark(false);
  }, [nowPlayingEp, favoriteEp]);

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

function ShortenText({ text, maxLength }) {
  return (
    <div>
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}
