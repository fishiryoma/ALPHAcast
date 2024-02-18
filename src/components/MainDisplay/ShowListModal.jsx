import Modal from "react-bootstrap/Modal";
import ShowCardLg from "./ShowCardLg";
import NowPlayingShow from "./NowPlayingShow";

function ShowListModal({ show, handleClose, ...rest }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <NowPlayingShow handleClose={handleClose} />

        <hr className="hr" style={{ color: "#EBEBEB" }}></hr>

        <Modal.Body
          className="d-flex flex-column gap-4 scrollbar p-4"
          style={{ overflowY: "scroll", height: "40rem" }}
        >
          <ShowCardLg />
          <ShowCardLg />
          <ShowCardLg />
          <ShowCardLg />
          <ShowCardLg />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowListModal;
