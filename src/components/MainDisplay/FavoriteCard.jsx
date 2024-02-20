import { useState, useEffect } from "react";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { deleteEpisode } from "../../api/acApi";
import { getEpisodes } from "../../api/auth-spotify";
import useAuth from "../../contexts/useAuth";

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

function FavoriteCard({ id }) {
  const [bookMark, setBookMark] = useState(true);
  const [playBtn, setPlayBtn] = useState(false);
  const [epData, setEpData] = useState([]);
  const { favoriteEp, setFavoriteEp } = useAuth();

  useEffect(() => {
    const getEpData = async () => {
      try {
        const res = await getEpisodes(id);
        // console.log(res);
        setEpData([res]);
      } catch (err) {
        console.error(`Get Episodes failed ${err}`);
      }
    };
    getEpData();
  }, [id]);

  const handleBookMarkClick = async () => {
    setBookMark(!bookMark);
    try {
      const res = await deleteEpisode(id);

      if (res) {
        setFavoriteEp(favoriteEp.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.log(`Edit Episode Failed ${err}`);
    }
  };

  return (
    <div className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 ">
      {!epData?.length ? (
        ""
      ) : (
        <>
          <img
            src={epData[0].images[1].url}
            style={{ width: "9.6rem", height: "9.6rem" }}
            className="rounded-3"
          />
          <div className="d-flex flex-column flex-grow-1">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="fs-5 fw-bold mt-2">{epData[0].name}</div>
                <div
                  className="fs-4"
                  onClick={handleBookMarkClick}
                  style={{ cursor: "pointer" }}
                >
                  {bookMark ? (
                    <BsBookmarkFill
                      style={{ color: "#FF7F50", strokeWidth: 0.8 }}
                    />
                  ) : (
                    <BsBookmark
                      style={{ color: "#FF7F50", strokeWidth: 0.8 }}
                    />
                  )}
                </div>
              </div>
              <div className="text-gray-500 fs-5 mt-1">
                <ShortenText text={epData[0].description} maxLength={200} />
              </div>
            </div>
            <div className="mt-3 d-flex gap-3 align-items-center">
              <div
                onClick={() => setPlayBtn(!playBtn)}
                style={{ cursor: "pointer" }}
              >
                {playBtn ? (
                  <BsPauseCircleFill
                    style={{ color: "#FF7F50", fontSize: "3rem" }}
                  />
                ) : (
                  <BsPlayCircleFill
                    style={{ color: "#FF7F50", fontSize: "3rem" }}
                  />
                )}
              </div>
              <p className="text-gray-500 fs-5">
                {epData[0].release_date}・
                <ConvertToHours ms={epData[0].duration_ms} />
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FavoriteCard;
