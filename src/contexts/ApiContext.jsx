import { createContext, useState, useEffect } from "react";
import AddPodcastModal from "../components/MainDisplay/AddPodcastModal";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const [myCategory, setMyCategory] = useState();
  const [showPodcastModal, setShowPodcastModal] = useState(false);

  const AddPodcast = (
    <AddPodcastModal
      show={showPodcastModal}
      title="新增 Podcast"
      handleClose={() => setShowPodcastModal(false)}
      handleSaveClick={() => setShowPodcastModal(false)}
    />
  );

  return (
    <ApiContext.Provider
      value={{ myCategory, setMyCategory, AddPodcast, setShowPodcastModal }}
    >
      {children}
    </ApiContext.Provider>
  );
}
export default ApiContext;
export { ApiProvider };
