import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SearchInput from "./SearchInput";
import ShowCardSm from "./ShowCardSm";
import { addShow } from "../../api/acApi";
import useApi from "../../contexts/useApi";

function AddPodcastModal({ show, handleClose, ...rest }) {
  const [searchedShows, setSearchedShows] = useState([]);
  const [isSelected, setIsSeleted] = useState("");
  const { nowCategory, myCategory, setMyCategory } = useApi();
  const renderedPodcast = searchedShows?.map((item) => (
    <ShowCardSm
      key={item.id}
      info={item}
      isSelected={isSelected}
      setIsSeleted={setIsSeleted}
    />
  ));

  const handleSaveClick = async () => {
    try {
      const res = await addShow({ showId: isSelected, categryId: nowCategory });
      if (res) {
        console.log("ok");
        setIsSeleted("");
        setMyCategory(
          myCategory.map((item) => {
            if (item.id === nowCategory) {
              return {
                ...item,
                savedShows: [...item.savedShows, { id: isSelected }],
              };
            } else return item;
          })
        );
      }
    } catch (err) {
      console.error(`Add Show Failed ${err}`);
    }
  };

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
                searchedShows={searchedShows}
                setSearchedShows={setSearchedShows}
              />
              <div className="fs-3 m-3 fw-bold">搜尋結果</div>
              <div
                className="scrollbar d-flex flex-wrap gap-5 p-1"
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
          {isSelected ? (
            <button
              className="btn btn-orange-500 text-white fs-4 border-rounded-lg btn_lg"
              onClick={handleSaveClick}
            >
              確認新增
            </button>
          ) : (
            <button
              className="btn btn-orange-500 text-white fs-4 border-rounded-lg btn_lg"
              disabled
            >
              確認新增
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPodcastModal;
