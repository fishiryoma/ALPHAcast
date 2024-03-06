import { deleteShow } from "../../api/acApi";
import useApi from "../../contexts/useApi";
import { useParams } from "react-router-dom";
import { successMsg } from "../PopupMsg";
import thumbImg from "../../../public/thumbImg.svg";
import { ShortenText } from "../Helper";

export default function SelectedShow({ handleClose, showInfo }) {
  const { myCategory, setMyCategory } = useApi();
  let { categoryId } = useParams();

  const handleDelete = async () => {
    try {
      const res = await deleteShow({
        categoryId,
        showId: showInfo?.id,
      });
      if (res) {
        successMsg("成功移除 Podcast 😊");
        setMyCategory(
          myCategory.map((category) => {
            if (category.id === categoryId) {
              return {
                ...category,
                savedShows: category.savedShows.filter(
                  (show) => show.id !== showInfo?.id
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
    <div
      className="d-flex gap-4 p-4 w-100 scrollbar"
      style={{ minHeight: "15rem", maxHeight: "20rem", overflow: "scroll" }}
    >
      <img
        src={showInfo?.images[1].url ? showInfo?.images[1].url : thumbImg}
        style={{ width: "12.8rem", height: "12.8rem" }}
        className="rounded-3"
      />
      <div className="d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-4 fw-bold">{showInfo?.name}</div>
            <button
              type="button"
              className="btn-close fs-4"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="text-gray-500 fs-5 mt-1">{showInfo?.publisher}</div>
          <div className="fs-5 mt-1" style={{ color: "#718096" }}>
            <ShortenText text={showInfo?.description} maxLength={300} />
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
