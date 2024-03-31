import { useState } from "react";
import FavoriteCard from "../components/podcast/FavoriteCard.jsx";
import AddPodcastModal from "../components/podcast/AddPodcastModal.jsx";
import useApi from "../contexts/useApi.jsx";
import search from "../../public/search.svg";

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

function AddPodcast() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <img src={search} alt="search icon" />
      <p className="text-secondary fs-3 fw-bold ">您尚未收藏任何 Podcast</p>
      <AddPodcastModal show={showModal} setShowModal={setShowModal} />
    </div>
  );
}
