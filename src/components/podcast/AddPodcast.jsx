import { useState } from "react";
import AddPodcastModal from "./AddPodcastModal";
import search from "../../../public/search.svg";
import { useLocation } from "react-router-dom";

export default function AddPodcast() {
  const [showModal, setShowModal] = useState(false);
  const pathname = useLocation();
  const nowCategory = pathname.pathname.split("/")[3];
  return (
    <div>
      {nowCategory.length ? (
        <div className="d-flex flex-column align-items-center gap-5">
          <img src={search} alt="search icon" />
          <p className="text-secondary fs-3 fw-bold ">
            您尚未加入任何 Podcast，可以點擊按鈕新增！
          </p>
          <button
            className="btn btn-orange-500 text-white fs-4 btn_lg border-rounded-lg"
            onClick={() => setShowModal(true)}
          >
            新增 Podcast
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center gap-5">
          <img src={search} alt="search icon" />
          <p className="text-secondary fs-3 fw-bold ">您尚未收藏任何 Podcast</p>
        </div>
      )}
      <AddPodcastModal show={showModal} setShowModal={setShowModal} />
    </div>
  );
}
