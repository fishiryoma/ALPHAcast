import { useEffect, useState } from "react";
import { getShow } from "../../api/auth-spotify";
import ShowListModal from "./ShowListModal";

function ShowCardSmInfo({ id }) {
  const [showInfo, setShowInfo] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    const getShowInfo = async () => {
      try {
        const res = await getShow(id);
        setShowInfo([res]);
      } catch (err) {
        console.error(`Search failed ${err}`);
      }
    };
    getShowInfo();
  }, [id]);

  return (
    <div
      className="shadow rounded-3 py-4"
      style={{ maxWidth: "18rem", padding: "1.75rem" }}
    >
      {!showInfo.length ? (
        ""
      ) : (
        <div className="h-100 d-flex flex-column justify-content-between">
          <div>
            <img
              src={showInfo[0].images[1].url}
              className="rounded-3"
              style={{ width: "14.4rem", height: "14.4rem" }}
            />

            <div className="fs-5 fw-bold mt-2">{showInfo[0].name}</div>
            <div className="text-gray-500 fs-5 mt-1">
              {showInfo[0].publisher}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-info text-white mt-2 fs-5 col-4"
              onClick={() => setModalShow(true)}
            >
              更多
            </button>
          </div>
        </div>
      )}
      <ShowListModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        showInfo={showInfo}
      />
    </div>
  );
}

export default ShowCardSmInfo;
