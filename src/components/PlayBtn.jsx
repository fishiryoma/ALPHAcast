import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import useApi from "../contexts/useApi";

export default function PlayBtn({ id, epData }) {
  const [playBtn, setPlayBtn] = useState(true);
  const { setNowPlayingEp, nowPlayingEp } = useApi();

  useEffect(() => {
    if (nowPlayingEp.id !== id) setPlayBtn(true);
  }, [nowPlayingEp]);

  return (
    <div
      onClick={() => {
        setPlayBtn(!playBtn);
        setNowPlayingEp({ id, epData });
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`play ${playBtn ? "" : "visually-hidden"}`}
        data-spotify-id={`spotify:episode:${id}`}
      >
        <BsPlayCircleFill style={{ color: "#FF7F50", fontSize: "3rem" }} />
      </div>
      <div className={`pause ${!playBtn ? "" : "visually-hidden"}`}>
        <BsPauseCircleFill style={{ color: "#FF7F50", fontSize: "3rem" }} />
      </div>
    </div>
  );
}