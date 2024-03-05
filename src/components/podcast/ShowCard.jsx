import { useEffect, useState, useRef } from "react";
import { getShow, getEpisodesByShow } from "../../api/spotifyApi";
import Modal from "react-bootstrap/Modal";
import EpisodeCard from "./EpisodeCard";
import SelectedShow from "./SelectedShow";
import { successMsg } from "../PopupMsg";
import thumbImg from "../../../public/thumbImg.svg";

export default function ShowCard({ id }) {
  const [showInfo, setShowInfo] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const getShowInfo = async () => {
      try {
        const res = await getShow(id);
        setShowInfo(res);
      } catch (err) {
        console.error(`Search failed ${err}`);
      }
    };
    getShowInfo();
  }, [id]);

  return (
    <div
      className="shadow rounded-3 py-4"
      style={{ maxWidth: "18rem", padding: "1.75rem" }}
    >
      <div className="h-100 d-flex flex-column justify-content-between">
        <div>
          <img
            src={showInfo?.images[1].url ? showInfo?.images[1].url : thumbImg}
            className="rounded-3"
            style={{ width: "14.4rem", height: "14.4rem" }}
          />
          <div className="fs-5 fw-bold mt-2">{showInfo?.name}</div>
          <div className="text-gray-500 fs-5 mt-1">{showInfo?.publisher}</div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-info text-white mt-2 fs-5 col-4"
            onClick={() => setModalShow(true)}
          >
            更多
          </button>
        </div>
      </div>
      <EpisodeListModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        showInfo={showInfo}
      />
    </div>
  );
}

function EpisodeListModal({ show, handleClose, showInfo }) {
  const [episodes, setEpisodes] = useState(null);
  const offset = useRef(10);

  useEffect(() => {
    const getAllEpisodes = async () => {
      if (!showInfo) return;
      try {
        const res = await getEpisodesByShow(showInfo.id);
        setEpisodes(res.items);
      } catch (err) {
        console.error(`Get Episodes failed ${err}`);
      }
    };
    getAllEpisodes();
  }, [showInfo]);

  const renderedCards = episodes?.map((ep) => (
    <EpisodeCard key={ep.id} episodeData={ep} />
  ));

  const handleClick = async () => {
    try {
      const res = await getEpisodesByShow(showInfo.id, offset.current);
      if (res) {
        setEpisodes([...episodes, ...res.items]);
        offset.current = offset.current + 10;
      }
    } catch (err) {
      console.error(err);
      successMsg("沒有更多集數了");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <SelectedShow handleClose={handleClose} showInfo={showInfo} />
        <hr className="hr" style={{ color: "#EBEBEB" }}></hr>
        <Modal.Body
          className="d-flex flex-column gap-4 scrollbar p-4"
          style={{ overflowY: "scroll", height: "40rem" }}
        >
          {renderedCards}
          <button
            className="btn fs-5 text-white btn_lg"
            style={{ backgroundColor: "#FF7F50" }}
            onClick={handleClick}
          >
            查看更多先前的集數
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
