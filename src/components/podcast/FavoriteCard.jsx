import { useState, useEffect } from "react";
import { getEpisodes } from "../../api/spotifyApi";
import useApi from "../../contexts/useApi";
import PlayBtn from "../PlayBtn";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { deleteEpisode } from "../../api/acApi";
import { bottomMsg_s } from "../PopupMsg";
import thumbImg from "../../../public/thumbImg.svg";
import { ShortenText, ConvertToHours } from "../Helper";
import { EpisodeListModal } from "./ShowCard";

export default function FavoriteCard({ id }) {
  const [epData, setEpData] = useState(null);
  const [show, setShow] = useState(false);
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

  return (
    <div
      className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 m-1 scrollbar"
      style={{
        outline: `${nowPlayingEp.id === id ? "solid 2px #FF7F50" : ""}`,
        overflowX: "scroll",
      }}
    >
      <img
        src={epData?.images[1].url ? epData?.images[1].url : thumbImg}
        style={{ width: "9.6rem", height: "9.6rem", cursor: "pointer" }}
        className="rounded-3"
        onClick={() => setShow(true)}
      />
      <div className="d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-5 fw-bold mt-2">{epData?.name}</div>
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
      <EpisodeListModal
        show={show}
        handleClose={() => setShow(false)}
        showInfo={epData?.show}
      />
    </div>
  );
}

function BookMarkBtn({ id }) {
  const [bookMark, setBookMark] = useState(true);
  const { favoriteEp, setFavoriteEp } = useApi();
  const handleDeleteFavorite = async (id) => {
    try {
      const res = await deleteEpisode(id);
      if (res) {
        setFavoriteEp(favoriteEp.filter((item) => item.id !== id));
        bottomMsg_s("成功移除最愛 😊");
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
      bottomMsg_s("發生未知的錯誤 🤔", "warning");
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
