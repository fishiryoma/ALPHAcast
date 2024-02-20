import ShowCardSmInfo from "./MainDisplay/ShowCardSmInfo";
import AddPodcast from "./MainDisplay/AddPodcast";
import useApi from "./../contexts/useApi";
import useAuth from "./../contexts/useAuth";
import FavoriteCard from "./MainDisplay/FavoriteCard";

function MainDisplay() {
  const { nowCategory, myCategory } = useApi();
  const { favoriteEp } = useAuth();

  const nowCategoryAllData = myCategory.filter(
    (item) => item.id === nowCategory
  );

  const renderedFavorite = favoriteEp.map((item) => (
    <div className="mb-3" key={item.id}>
      <FavoriteCard id={item.id} />
    </div>
  ));

  // console.log("nowCategory", nowCategory);
  // console.log("categry:", nowCategoryAllData);
  return (
    <div className="p-5 ">
      <p className="fs-1 fw-bold mb-3">早安</p>
      {nowCategory.length && nowCategoryAllData[0].savedShows.length ? (
        <div className="d-flex gap-4 flex-wrap">
          {nowCategoryAllData[0].savedShows.map((item) => (
            <ShowCardSmInfo key={item.id} id={item.id} />
          ))}
        </div>
      ) : !nowCategory.length && favoriteEp.length ? (
        <>{renderedFavorite}</>
      ) : (
        <AddPodcast />
      )}
    </div>
  );
}

export default MainDisplay;
