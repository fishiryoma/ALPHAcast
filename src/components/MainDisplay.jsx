import styles from "./mainDisplay.module.scss";
import CardMusicVertical from "./CardMusicVertical";

function MainDisplay() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>早安</p>
      <div className={styles.card_wrap}>
        <CardMusicVertical />
        <CardMusicVertical />
        <CardMusicVertical />
        <CardMusicVertical />
        <CardMusicVertical />
        <CardMusicVertical />
      </div>
    </div>
  );
}

export default MainDisplay;
