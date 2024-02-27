import { useState } from "react";
import CategoryModal from "./CategoryModal";
import CategoryInput from "./CategoryInput";
import EmojiInput from "./EmojiInput";
import { getCategory, createCategory } from "../../api/acApi";
import useApi from "../../contexts/useApi";

export default function AddNewCategoryModal() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [categoryEmoji, setCategoryEmoji] = useState("1f642");
  const { setMyCategory } = useApi();

  const handleCreateClick = async () => {
    setShowModal(false);
    const categoryName = input.concat(",", categoryEmoji);
    try {
      const success = await createCategory(categoryName);
      if (success) {
        const updatedCategory = await getCategory();
        setMyCategory(updatedCategory);
        setInput("");
        setCategoryEmoji("1f642");
      }
    } catch (err) {
      console.log(`reapeat${err}`);
    }
  };
  return (
    <>
      <button
        className="btn btn-outline-info col-12 px-4 fs-4 hover_text_white border-rounded-lg border-2"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <p className="fs-1">&#43;</p>
          <p>新增分類</p>
        </div>
      </button>
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
              value={categoryEmoji}
              text="請輸入圖示文字:"
              setEmoji={setCategoryEmoji}
            />

            <div className="w-100">
              <CategoryInput
                input={input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
        }
        handleSaveClick={handleCreateClick}
      />
    </>
  );
}
