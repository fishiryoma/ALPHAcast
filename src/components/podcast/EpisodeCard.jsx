import { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { addEpisode, deleteEpisode } from "../../api/acApi";
import PlayBtn from "../PlayBtn";
import useApi from "../../contexts/useApi";
import { bottomMsg_s } from "../PopupMsg";
import thumbImg from "../../../public/thumbImg.svg";
import { ShortenText, ConvertToHours } from "../Helper";

export default function EpisodeCard({ episodeData }) {
  return (
    <div
      className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 scrollbar"
      style={{ maxHeight: "25rem", overflow: "auto", minHeight: "16rem" }}
    >
      {/* minHeight: "16rem", , height: "20rem"  */}
      <img
        src={episodeData?.images[1].url ? episodeData?.images[1].url : thumbImg}
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

    try {
      if (!bookMark) {
        const res = await addEpisode(episodeData?.id);
        if (res) {
          setFavoriteEp([...favoriteEp, { id: episodeData?.id }]);
          bottomMsg_s("成功加入收藏 😊");
        }
      } else {
        const res = await deleteEpisode(episodeData?.id);
        if (res) {
          setFavoriteEp(
            favoriteEp.filter((item) => item.id !== episodeData?.id)
          );
          bottomMsg_s("成功移除收藏 😊");
        }
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
      bottomMsg_s("發生未知的錯誤 🤔", "warning");
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
