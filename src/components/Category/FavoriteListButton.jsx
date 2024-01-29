import styles from "./favoriteListButton.module.scss";
import { FiMoreVertical } from "react-icons/fi";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useState } from "react";
import ApiContext from "../../contexts/ApiContext";
import CategoryModal from "./CategoryModal";

function FavoriteListButton({ name, id, ...rest }) {
  const [id, setId] = useState("");
  const [editShow, seteditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const { OnDeleteCategory } = useContext(ApiContext);
  const dropddownClass = "h4 mb-0 py-4 px-4";
  const handleEdit = (e) => {
    console.log(e.target.id);
  };
  const handleDeleteClick = () => {
    setDeleteShow(false);
    // OnDeleteCategory(e.target.id);
  };

  return (
    <div>
      <div className={styles.container_button}>
        <button className={styles.btn} {...rest} id={id}>
          {name}
        </button>
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
              <p onClick={handleEdit} id={id}>
                編輯名稱
              </p>
            </Dropdown.Item>
            <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
            <Dropdown.Item href="#/action-2" className={dropddownClass}>
              <p onClick={() => setDeleteShow(true)} id={id}>
                刪除分類
              </p>
            </Dropdown.Item>
            <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
            <Dropdown.Item href="#/action-3" className={dropddownClass}>
              <p id={id}>新增Podcast</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CategoryModal
        show={deleteShow}
        handleClose={() => setDeleteShow(false)}
        title="刪除分類"
        body={`確定刪除?`}
        handleInputClick={handleDeleteClick}
      />
    </div>
  );
}

export default FavoriteListButton;
