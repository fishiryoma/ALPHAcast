import { BsPlayCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import useApi from "../contexts/useApi";
import { bottomMsg_s } from "./PopupMsg";

export default function PlayBtn({ id, epData }) {
  const [playBtn, setPlayBtn] = useState(true);
  const { setNowPlayingEp, nowPlayingEp } = useApi();

  useEffect(() => {
    if (nowPlayingEp.id !== id) setPlayBtn(true);
  }, [nowPlayingEp, id]);

  return (
    <div
      onClick={() => {
        setPlayBtn(!playBtn);
        setNowPlayingEp({ id, epData });
        bottomMsg_s("開始撥放，快去查看撥放器", "info");
      }}
      style={{ cursor: "pointer" }}
    >
      <BsPlayCircleFill style={{ color: "#FF7F50", fontSize: "3rem" }} />
    </div>
  );
}
