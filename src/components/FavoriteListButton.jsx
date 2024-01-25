import styles from "../components/favoriteListButton.module.scss";
import { FiMoreVertical } from "react-icons/fi";
import Dropdown from "react-bootstrap/Dropdown";

function FavoriteListButton({ name }) {
  const dropddownClass = "h4 mb-0 py-4 px-4";
  return (
    <div className={styles.container_button}>
      <button className={styles.btn}>{name}</button>
      <Dropdown>
        <Dropdown.Toggle variant="none" bsPrefix="none">
          <FiMoreVertical className={styles.icon} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-0 border-0 shadow-sm">
          <Dropdown.Item
            href="#/action-1"
            className={dropddownClass}
            style={{ color: "#FF7F50" }}
          >
            編輯名稱
          </Dropdown.Item>
          <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
          <Dropdown.Item href="#/action-2" className={dropddownClass}>
            刪除分類
          </Dropdown.Item>
          <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
          <Dropdown.Item href="#/action-3" className={dropddownClass}>
            新增Podcast
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FavoriteListButton;
