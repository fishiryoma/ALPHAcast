import { useState, useEffect } from "react";
import SearchedShowCard from "./SearchedShowCard";
import Modal from "react-bootstrap/Modal";
import { IoIosSearch } from "react-icons/io";
import { addShow } from "../../api/acApi";
import { searchShow } from "../../api/spotifyApi";
import useApi from "../../contexts/useApi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

export default function AddPodcastModal({ show, setShowModal }) {
  const [searchedShows, setSearchedShows] = useState([]);
  const [isSelected, setIsSeleted] = useState("");
  const [displaySection, setDisplaySection] = useState("");
  const { myCategory, setMyCategory } = useApi();
  let { categoryId } = useParams();

  // infinite Scroll開發中
  // const obs = new IntersectionObserver(
  //   function (entries) {
  //     console.log(entries);
  //     if (entries[0].isIntersecting) console.log("here");
  //   },
  //   {
  //     root: document.getElementById("searchPodcast"),
  //     threshold: 0,
  //     rootMargin: 0,
  //   }
  // );

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
      const res = await addShow({ showId: isSelected, categoryId });
      if (res) {
        setIsSeleted("");
        setMyCategory(
          myCategory.map((item) => {
            if (item.id === categoryId) {
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
    setDisplaySection("");
  };

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
                setDisplaySection={setDisplaySection}
              />
              <div className="fs-3 m-3 fw-bold">搜尋結果</div>

              <div id="searchPodcast" style={{ height: "40rem" }}>
                <SearchedDisplay
                  displaySection={displaySection}
                  searchedShows={searchedShows}
                  isSelected={isSelected}
                  setIsSeleted={setIsSeleted}
                />
              </div>
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer className="bg-light">
          <button className="btn fs-4 btn_lg" onClick={handleClose}>
            取消
          </button>
          <button
            className="btn text-white fs-4 border-rounded-lg btn_lg"
            onClick={handleSaveClick}
            disabled={!isSelected.length ? true : false}
            style={{ backgroundColor: "#FF7F50" }}
          >
            確認新增
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function SearchedDisplay({
  displaySection,
  searchedShows,
  isSelected,
  setIsSeleted,
}) {
  const renderedPodcast = searchedShows?.map((item) => (
    <SearchedShowCard
      key={item.id}
      info={item}
      isSelected={isSelected}
      setIsSeleted={setIsSeleted}
    />
  ));
  const display = () => {
    if (displaySection === "") return "";
    if (displaySection === "loading") return <Loading />;
    if (displaySection === "finished")
      return (
        <div
          className="scrollbar d-flex flex-wrap gap-5 p-1 h-100"
          style={{ overflowY: "scroll" }}
        >
          {renderedPodcast}
        </div>
      );
    if (displaySection === "findNO")
      return <div className="text-center fs-3 mt-5">沒有找到相關資訊 🥲</div>;
  };

  return <>{display()}</>;
}

function SearchInput({ setSearchedShows, setDisplaySection }) {
  const [input, setInput] = useState("");

  const handleKeyPress = async (e) => {
    let resData;
    if (e.key === "Enter") {
      setDisplaySection("loading");
      try {
        const res = await searchShow(input);
        resData = res;
        console.log(res.items);
        setSearchedShows(res.items);
      } catch (err) {
        console.log(`Search failed ${err}`);
      } finally {
        if (resData.items.length === 0) {
          setDisplaySection("findNO");
        } else setDisplaySection("finished");
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
