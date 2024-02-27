import { useState } from "react";
import SearchedShowCard from "./SearchedShowCard";
import Modal from "react-bootstrap/Modal";
import { IoIosSearch } from "react-icons/io";
import { addShow } from "../../api/acApi";
import { searchShow } from "../../api/spotifyApi";
import useApi from "../../contexts/useApi";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

export default function AddPodcastModal({ show, setShowModal }) {
  const [searchedShows, setSearchedShows] = useState([]);
  const [isSelected, setIsSeleted] = useState("");
  const { myCategory, setMyCategory } = useApi();
  const pathname = useLocation();
  const nowCategory = pathname.pathname.split("/")[3];

  const handleSaveClick = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2500,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    try {
      const res = await addShow({ showId: isSelected, categryId: nowCategory });
      if (res) {
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

        Toast.fire({
          icon: "success",
          html: '<p class="fs-4 fw-bold">成功新增 Podcast 😊</p>',
        });
      }
    } catch (err) {
      console.error(`Add Show Failed ${err}`);
      Toast.fire({
        icon: "warning",
        html: '<p class="fs-4 fw-bold">發生了未知錯誤 🤔</p>',
      });
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsSeleted("");
    setSearchedShows([]);
  };

  const renderedPodcast = searchedShows?.map((item) => (
    <SearchedShowCard
      key={item.id}
      info={item}
      isSelected={isSelected}
      setIsSeleted={setIsSeleted}
    />
  ));

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <h3 className="modal-title fw-bold">新增 Podcast</h3>
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

function SearchInput({ setSearchedShows }) {
  const [input, setInput] = useState("");

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await searchShow(input);
        console.log(res.items);
        setSearchedShows(res.items);
      } catch (err) {
        console.log(`Search failed ${err}`);
      }
    }
  };

  return (
    <div className="input-group mb-3 p-2">
      <div className="input-group-text border-0 border-rounded-lg">
        <IoIosSearch className="fs-3 text-secondary" />
      </div>
      <input
        type="text"
        className="form-control form-control-lg bg-light border-0 border-rounded-lg fs-4"
        placeholder="開始搜尋..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
