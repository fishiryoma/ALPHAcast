import styles from "./navbar.module.scss";
import FavoriteListButton from "./Category/FavoriteListButton";
import CategoryModal from "./Category/CategoryModal";
import { useContext, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import CategoryInput from "./Category/CategoryInput";

function Navbar() {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const { myCategory, OnCreatCategory } = useContext(ApiContext);

  const handleInputClick = async () => {
    try {
      const success = await OnCreatCategory(input);
      if (success) {
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleClose = () => {
    setInput("");
    setShow(false);
  };

  const renderedList = myCategory.map((list) => (
    <FavoriteListButton key={list.name} name={list.name} id={list.id} />
  ));

  return (
    <div className={styles.container_list}>
      <img src="logo.svg" alt="logo" />
      <hr />
      <div className={styles.list_wrap}>
        {renderedList}
        <button className={styles.btn} onClick={handleShow}>
          <span>+</span>新增分類
        </button>
      </div>
      <CategoryModal
        show={show}
        handleClose={handleClose}
        title="新增分類"
        body={
          <CategoryInput
            input={input}
            value={input}
            onChange={handleInputChange}
          />
        }
        handleInputClick={handleInputClick}
      />
    </div>
  );
}

export default Navbar;
