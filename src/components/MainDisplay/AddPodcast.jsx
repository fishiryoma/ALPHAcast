import useApi from "../../contexts/useApi";

function AddPodcast() {
  const { AddPodcast, setShowPodcastModal, nowCategory } = useApi();
  return (
    <div>
      {nowCategory.length ? (
        <div className="d-flex flex-column align-items-center gap-5">
          <img src="search.svg" alt="search icon" />
          <p className="text-secondary fs-3 fw-bold ">
            您尚未加入任何 Podcast，可以點擊按鈕新增！
          </p>
          <button
            className="btn btn-orange-500 text-white fs-4 btn_lg border-rounded-lg"
            onClick={() => setShowPodcastModal(true)}
          >
            新增 Podcast
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center gap-5">
          <img src="search.svg" alt="search icon" />
          <p className="text-secondary fs-3 fw-bold ">您尚未收藏任何 Podcast</p>
        </div>
      )}
      {AddPodcast}
    </div>
  );
}

export default AddPodcast;
