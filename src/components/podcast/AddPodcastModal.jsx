import { useState, useEffect, useRef, useMemo } from "react";
import SearchedShowCard from "./SearchedShowCard";
import Modal from "react-bootstrap/Modal";
import { IoIosSearch } from "react-icons/io";
import { addShow } from "../../api/acApi";
import { searchShow } from "../../api/spotifyApi";
import useApi from "../../contexts/useApi";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { bottomMsg_s } from "../PopupMsg";

export default function AddPodcastModal({ show, setShowModal }) {
  const [searchedShows, setSearchedShows] = useState([]);
  const [isSelected, setIsSeleted] = useState("");
  const [displaySection, setDisplaySection] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const { myCategory, setMyCategory } = useApi();
  let { categoryId } = useParams();

  const handleSaveClick = async () => {
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
        bottomMsg_s("成功新增 Podcast 😊");
      }
    } catch (err) {
      console.error(`Add Show Failed ${err}`);
      bottomMsg_s("發生了未知錯誤 🤔", "warning");
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
                setLoading={setLoading}
                setKeyword={setKeyword}
              />
              <div className="fs-3 m-3 fw-bold">搜尋結果</div>
              <div id="searchPodcast" style={{ height: "40rem" }}>
                {loading && <Loading />}
                <div
                  className="scrollbar d-flex flex-wrap gap-5 p-1 h-100"
                  style={{ overflowY: "scroll" }}
                >
                  <SearchedDisplay
                    displaySection={displaySection}
                    searchedShows={searchedShows}
                    setSearchedShows={setSearchedShows}
                    isSelected={isSelected}
                    setIsSeleted={setIsSeleted}
                    keyword={keyword}
                  />
                </div>
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
  setSearchedShows,
  isSelected,
  setIsSeleted,
  keyword,
}) {
  const [noMoreData, setNoMoreData] = useState(false);
  const toSearchRef = useRef(null);
  const page = useRef(20);

  const obs = useMemo(() => {
    return new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const searchMore = async () => {
            try {
              const res = await searchShow(keyword, page.current);
              console.log(res);
              if (res && res.items.length > 0) {
                setSearchedShows([...searchedShows, ...res.items]);
                page.current = page.current + 20;
              } else {
                setNoMoreData(true);
                obs.disconnect();
              }
            } catch (err) {
              console.err(err);
            }
          };
          searchMore();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
  }, [keyword, searchedShows, setSearchedShows]);

  useEffect(() => {
    const currentRefValue = toSearchRef.current;
    if (toSearchRef.current) {
      obs.observe(toSearchRef.current);
    }
    return () => {
      if (currentRefValue) {
        obs.unobserve(currentRefValue);
      }
    };
  }, [obs]);

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
    if (displaySection === "finished")
      return (
        <div
          className="scrollbar d-flex flex-wrap gap-5 p-1 h-100"
          style={{ overflowY: "scroll" }}
        >
          {renderedPodcast}
          {noMoreData ? (
            <p className="w-100 text-center fs-3">沒有更多資料了</p>
          ) : (
            <div ref={toSearchRef} className="w-100">
              <Loading />
            </div>
          )}
        </div>
      );
    if (displaySection === "findNO")
      return (
        <div className="text-center fs-3 mt-5 w-100">沒有找到相關資訊 🥲</div>
      );
  };

  return <>{display()}</>;
}

function SearchInput({
  setSearchedShows,
  setLoading,
  setDisplaySection,
  setKeyword,
}) {
  const [input, setInput] = useState("");
  const handleKeyPress = async (e) => {
    let resData;
    if (e.key === "Enter") {
      setLoading(true);
      setKeyword(input);
      try {
        const res = await searchShow(input);
        resData = res;
        setSearchedShows(res.items);
      } catch (err) {
        console.log(`Search failed ${err}`);
      } finally {
        setLoading(false);
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
