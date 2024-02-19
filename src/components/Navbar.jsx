import { useState, useEffect } from "react";
import EditCategoryBtn from "./Category/EditCategoryBtn";
import CategoryModal from "./Category/CategoryModal";
import CategoryInput from "./Category/CategoryInput";
import EmojiInput from "./Category/EmojiInput";
import {
  getCategory,
  createCategory,
  deleteCategory,
  editCategory,
} from "../api/acApi";
import useApi from "./../contexts/useApi";

function Navbar() {
  const { myCategory, setMyCategory } = useApi();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [emoji, setEmoji] = useState("1f642");

  useEffect(() => {
    const getMyCategory = async () => {
      try {
        const res = await getCategory();
        setMyCategory(res);
        // console.log("--------RUN USEEFFECT in NAVBAR----------");
      } catch (err) {
        console.log(err);
      }
    };
    getMyCategory();
  }, []);

  // 操作Category API
  const handleCreateClick = async () => {
    setShowModal(false);
    const categoryName = input.concat(",", emoji);
    try {
      const success = await createCategory(categoryName);
      if (success) {
        const updatedCategory = await getCategory();
        setMyCategory(updatedCategory);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteClick = async (id) => {
    try {
      const success = await deleteCategory(id);
      if (success) {
        const updatedCategory = await getCategory();
        setMyCategory(updatedCategory);
      }
    } catch (err) {
      console.log(`Delete Category Failed ${err}`);
    }
  };
  const handleEditClick = async ({ id, name }) => {
    try {
      const success = await editCategory({ id, name });
      if (success) {
        const updatedCategory = await getCategory();
        setMyCategory(updatedCategory);
      }
    } catch (err) {
      console.log(`Delete Category Failed ${err}`);
    }
  };

  const renderedList = myCategory?.map((list) => {
    const splitName = list.name.split(",");
    // 測試用
    // console.log(splitName);
    return (
      <EditCategoryBtn
        key={list.id}
        name={splitName[0]}
        icon={splitName[1]}
        id={list.id}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    );
  });

  return (
    <div className="bg-light d-flex flex-column align-items-center">
      <img src="logo.svg" alt="logo" className="col-9 my-5" />
      <hr className="hr col-9 bg-secondary" />
      <div className="col-10 mt-5 ">
        {renderedList}
        <button
          className="mt-4 btn btn-outline-info col-12 px-4 fs-4 hover_text_white border-rounded-lg border-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <p className="fs-1">&#43;</p>
            <p>新增分類</p>
          </div>
        </button>
      </div>
      <CategoryModal
        show={showModal}
        handleClose={() => {
          setInput("");
          setShowModal(false);
        }}
        title="新增分類"
        body={
          <div className="d-flex gap-3">
            <EmojiInput
              value={emoji}
              text="請輸入圖示文字:"
              setEmoji={setEmoji}
            />
            <CategoryInput
              input={input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        }
        handleSaveClick={handleCreateClick}
      />
    </div>
  );
}

export default Navbar;
