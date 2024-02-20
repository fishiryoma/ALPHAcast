import Modal from "react-bootstrap/Modal";
import ShowCardLg from "./ShowCardLg";
import NowPlayingShow from "./NowPlayingShow";
import { useEffect, useState } from "react";
import { getEpisodesByShow } from "../../api/auth-spotify";

function ShowListModal({ show, handleClose, showInfo }) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getAllEpisodes = async () => {
      if (!showInfo.length) return;
      try {
        const res = await getEpisodesByShow(showInfo[0].id);
        setEpisodes([res.items]);
      } catch (err) {
        console.error(`Get Episodes failed ${err}`);
      }
    };
    getAllEpisodes();
  }, [showInfo]);

  const renderedCards = episodes[0]?.map((ep) => (
    <ShowCardLg key={ep.id} episodeData={[ep]} />
  ));
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <NowPlayingShow handleClose={handleClose} showInfo={showInfo} />
        <hr className="hr" style={{ color: "#EBEBEB" }}></hr>
        <Modal.Body
          className="d-flex flex-column gap-4 scrollbar p-4"
          style={{ overflowY: "scroll", height: "40rem" }}
        >
          {renderedCards}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowListModal;
