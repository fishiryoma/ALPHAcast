import Navbar from "../components/Navbar";
import MainDisplay from "../components/MainDisplay";
import Sidebar from "../components/Sidebar";
import styles from "./homepage.module.scss";
import { getProfile, getRefreshToken } from "../api/auth-spotify";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    console.log("alo");
    const updatePage = async () => {
      await getRefreshToken();
      await getProfile();
      console.log("hihi");
    };
    updatePage();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <MainDisplay />
      <Sidebar />
    </div>
  );
}

export default HomePage;
