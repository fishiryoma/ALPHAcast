import { getProfile, getRefreshToken } from "../api/auth-spotify";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MainDisplay from "../components/MainDisplay";
import Sidebar from "../components/Sidebar";
import styles from "./homepage.module.scss";
import { ApiProvider } from "../contexts/ApiContext.jsx";

function HomePage() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const updatePage = async () => {
      await getRefreshToken();
      const { display_name } = await getProfile();
      setUserName(display_name);
      // await searchItem("chill");
    };
    updatePage();
  }, []);

  return (
    <ApiProvider>
      <div className={styles.container}>
        <Navbar />
        <MainDisplay />
        <Sidebar />
      </div>
    </ApiProvider>
  );
}

export default HomePage;
