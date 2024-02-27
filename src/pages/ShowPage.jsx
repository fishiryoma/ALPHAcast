import useApi from "../contexts/useApi.jsx";
import AddPodcast from "../components/podcast/AddPodcast.jsx";
import ShowCard from "../components/podcast/ShowCard.jsx";
import { useLocation } from "react-router-dom";

export default function ShowPage() {
  const { myCategory } = useApi();
  const pathname = useLocation();
  const nowCategoryAllData = myCategory.filter(
    (item) => item.id === pathname.pathname.split("/")[3]
  );

  const renderedShowCards = nowCategoryAllData[0]?.savedShows.map((item) => (
    <ShowCard key={item.id} id={item.id} />
  ));

  return (
    <>
      {nowCategoryAllData[0]?.savedShows.length ? (
        <div className="d-flex gap-4 flex-wrap">{renderedShowCards}</div>
      ) : (
        <AddPodcast />
      )}
    </>
  );
}
