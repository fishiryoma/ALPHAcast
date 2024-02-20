import { deleteShow } from "../../api/acApi";
import useApi from "../../contexts/useApi";

function ShortenText({ text, maxLength }) {
  return (
    <div>
      {text.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
    </div>
  );
}

function NowPlayingShow({ handleClose, showInfo }) {
  const { nowCategory, myCategory, setMyCategory } = useApi();
  // console.log(myCategory);
  const handleDelete = async () => {
    try {
      const res = await deleteShow({
        categoryId: nowCategory,
        showId: showInfo[0].id,
      });
      if (res) {
        setMyCategory(
          myCategory.map((category) => {
            if (category.id === nowCategory) {
              return {
                ...category,
                savedShows: category.savedShows.filter(
                  (show) => show.id !== showInfo[0].id
                ),
              };
            } else return category;
          })
        );
      }
    } catch (err) {
      console.log(`Delete Show Failed ${err}`);
    }
  };

  return (
    <div className="d-flex gap-4 p-4">
      <img
        src={showInfo[0].images[1].url}
        style={{ width: "12.8rem", height: "12.8rem" }}
        className="rounded-3"
      />
      <div className="d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-4 fw-bold">{showInfo[0].name}</div>
            <button
              type="button"
              className="btn-close fs-4"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="text-gray-500 fs-5 mt-1">{showInfo[0].publisher}</div>
          <div className="fs-5 mt-1" style={{ color: "#718096" }}>
            <ShortenText text={showInfo[0].description} maxLength={300} />
          </div>
        </div>
        <div className="text-end">
          <button
            className="btn btn-outline-danger mt-2 fs-5"
            onClick={handleDelete}
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
}

export default NowPlayingShow;
