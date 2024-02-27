import FavoriteCard from "../components/podcast/FavoriteCard.jsx";
import AddPodcast from "../components/podcast/AddPodcast.jsx";
import useApi from "../contexts/useApi.jsx";

export default function FavoritePage() {
  const { favoriteEp } = useApi();

  const renderedFavorite = favoriteEp.map((item) => (
    <div className="mb-3" key={item.id}>
      <FavoriteCard id={item.id} />
    </div>
  ));

  return (
    <>{favoriteEp.length ? renderedFavorite : <AddPodcast />}</>
    //
  );
}
