import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SearchInput from "./SearchInput";
import ShowCardSm from "./ShowCardSm";

function AddPodcastModal({ show, handleClose, handleSaveClick, ...rest }) {
  const [searchItems, setSearchItems] = useState([]);

  const renderedPodcast = searchItems?.map((item) => (
    <ShowCardSm key={item.id} info={item} />
  ));

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h3 className="modal-title fw-bold">{rest.title}</h3>
        </Modal.Header>
        <div className="fs-4">
          <Modal.Body>
            <div>
              <SearchInput
                searchItems={searchItems}
                setSearchItems={setSearchItems}
              />
              <div className="fs-3 m-3 fw-bold">搜尋結果</div>
              <div
                className="scrollbar d-flex flex-wrap gap-5"
                style={{ overflowY: "scroll", height: "40rem" }}
              >
                {renderedPodcast}
              </div>
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer className="bg-light">
          <button className="btn fs-4 btn_lg" onClick={handleClose}>
            取消
          </button>
          <button
            className="btn btn-orange-500 text-white fs-4 border-rounded-lg btn_lg"
            onClick={handleSaveClick}
          >
            確認新增
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPodcastModal;
