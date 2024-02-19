import { useState } from "react";
import ShowCardSmInfo from "./MainDisplay/ShowCardSmInfo";
import ShowCardLg from "./MainDisplay/ShowCardLg";

import AddPodcast from "./MainDisplay/AddPodcast";
import useApi from "./../contexts/useApi";

function MainDisplay() {
  const { nowCategory, myCategory } = useApi();

  const nowCategoryAllData = myCategory.filter(
    (item) => item.id === nowCategory
  );

  // console.log("nowCategory", nowCategory);
  // console.log("categry:", nowCategoryAllData);
  return (
    <div className="p-5 ">
      <p className="fs-1 fw-bold mb-3">早安</p>
      {nowCategory && nowCategoryAllData[0].savedShows.length ? (
        <div className="d-flex gap-4 flex-wrap">
          {nowCategoryAllData[0].savedShows.map((item) => (
            <ShowCardSmInfo key={item.id} id={item.id} />
          ))}
        </div>
      ) : (
        <AddPodcast />
      )}
    </div>
  );
}

export default MainDisplay;
