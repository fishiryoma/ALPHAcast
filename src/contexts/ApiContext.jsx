import { createContext, useState, useEffect } from "react";
import AddPodcastModal from "../components/MainDisplay/AddPodcastModal";
import { getCategory } from "../api/acApi";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const [myCategory, setMyCategory] = useState([]);
  const [nowCategory, setNowCategory] = useState("");
  const [showPodcastModal, setShowPodcastModal] = useState(false);

  useEffect(() => {
    const getMyCategory = async () => {
      try {
        const res = await getCategory();
        const sortCategory = res.sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        );
        setMyCategory(sortCategory);
      } catch (err) {
        console.log(err);
      }
    };
    getMyCategory();
  }, []);

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
      value={{
        myCategory,
        setMyCategory,
        nowCategory,
        setNowCategory,
        AddPodcast,
        setShowPodcastModal,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
export default ApiContext;
export { ApiProvider };
