import { Suspense, useState } from "react";
import useApi from "../contexts/useApi.jsx";
import AddPodcastModal from "../components/podcast/AddPodcastModal.jsx";
import ShowCard from "../components/podcast/ShowCard.jsx";
import { useParams } from "react-router-dom";
import search from "../../public/search.svg";
import Loading from "../components/Loading.jsx";

export default function ShowPage() {
  const { myCategory } = useApi();
  let { categoryId } = useParams();
  const nowCategoryAllData = myCategory.filter(
    (item) => item.id === categoryId
  );

  const renderedShowCards = nowCategoryAllData[0]?.savedShows.map((item) => (
    <ShowCard key={item.id} id={item.id} />
  ));

  return (
    <>
      <Suspense fallback={<Loading />}>
        {nowCategoryAllData[0]?.savedShows.length ? (
          <div className="d-flex gap-4 flex-wrap">{renderedShowCards}</div>
        ) : (
          <AddPodcast />
        )}
      </Suspense>
    </>
  );
}

function AddPodcast() {
  const [showModal, setShowModal] = useState(false);
  return (
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
      <AddPodcastModal show={showModal} setShowModal={setShowModal} />
    </div>
  );
}
