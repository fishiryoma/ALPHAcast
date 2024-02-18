import { useState } from "react";
import ShowCardSmInfo from "./MainDisplay/ShowCardSmInfo";
import ShowCardLg from "./MainDisplay/ShowCardLg";
import ShowListModal from "./MainDisplay/ShowListModal";
import AddPodcast from "./MainDisplay/AddPodcast";

function MainDisplay() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="p-5 ">
      <p className="fs-1 fw-bold mb-3">早安</p>
      <AddPodcast />
      <div className="d-flex gap-4 flex-wrap">
        <ShowCardSmInfo handleOpen={() => setModalShow(true)} />
        <ShowListModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
        />
      </div>
      <ShowCardLg />
    </div>
  );
}

export default MainDisplay;
