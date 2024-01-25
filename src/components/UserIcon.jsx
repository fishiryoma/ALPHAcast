import styles from "./userIcon.module.scss";

function UserIcon() {
  return (
    <div className={styles.box}>
      <img src="iconExample.svg" alt="icon" className={styles.icon} />
      <p className={styles.name}>John Doe</p>
    </div>
  );
}

export default UserIcon;
