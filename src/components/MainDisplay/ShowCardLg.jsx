import { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";

function ShortenText({ text, maxLength }) {
  return (
    <div>
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}

function ShowCardLg({ episodeData }) {
  console.log(episodeData);
  const [bookMark, setBookMark] = useState(false);
  const [playBtn, setPlayBtn] = useState(false);
  return (
    <div className="d-flex gap-4 border border-light shadow-sm border-rounded-lg p-3 ">
      {!episodeData?.length ? (
        ""
      ) : (
        <>
          <img
            src={episodeData[0].images[1].url}
            style={{ width: "9.6rem", height: "9.6rem" }}
            className="rounded-3"
          />
          <div className="d-flex flex-column flex-grow-1">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="fs-5 fw-bold mt-2">{episodeData[0].name}</div>
                <div
                  className="fs-4"
                  onClick={() => setBookMark(!bookMark)}
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
                <ShortenText
                  text={episodeData[0].description}
                  maxLength={200}
                />
              </div>
            </div>
            <div className="mt-3 d-flex gap-3 align-items-center">
              <div onClick={() => setPlayBtn(!playBtn)}>
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
                {episodeData[0].release_date}・{episodeData[0].duration_ms}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowCardLg;
