import styles from "./sidebar.module.scss";
import CardPlayMusic from "./CardPlayMusic";
import UserIcon from "./UserIcon";

function Sidebar() {
  return (
    <div className={styles.container}>
      <UserIcon />
      <CardPlayMusic />
    </div>
  );
}

export default Sidebar;
