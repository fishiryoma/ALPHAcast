import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import useApi from "./../../contexts/useApi";
import Dropdown from "react-bootstrap/Dropdown";
import CategoryModal from "./CategoryModal";
import CategoryInput from "./CategoryInput";
import EmojiInput from "./EmojiInput";
import { Emoji } from "emoji-picker-react";

function EditCategoryBtn({
  icon,
  name,
  id,
  handleDeleteClick,
  handleEditClick,
}) {
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [inputText, setInputText] = useState(name);
  const [inputEmoji, setInpuEmoji] = useState(icon);
  const { AddPodcast, setShowPodcastModal, nowCategory, setNowCategory } =
    useApi();

  const dropddownClass = "h4 mb-0 py-4 px-4";
  const btnActive = {
    background: `${nowCategory === id ? "black" : ""}`,
    color: `${nowCategory === id ? "white" : ""}`,
    stroke: "white",
  };

  // 操作編輯API
  const onDeleteClick = () => {
    setDeleteShow(false);
    handleDeleteClick(id);
  };
  const onEditClick = () => {
    const categoryName = inputText.concat(",", inputEmoji);
    setEditShow(false);
    handleEditClick({ id, name: categoryName });
  };
  // console.log("editshow", editShow);
  // console.log("deleteshow", deleteShow);

  return (
    <div>
      <div
        className="w-100 d-flex justify-content-between py-3 btn btn-outline-dark border-0 border-rounded-lg"
        style={btnActive}
        onClick={() => {
          setNowCategory(id);
        }}
      >
        <div className="d-flex fs-4 align-items-center gap-4 ">
          <Emoji unified={icon} size="20" />
          <div>{name}</div>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="none" bsPrefix="none">
            <FiMoreVertical className="fs-2" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="py-0 border-0 shadow-sm">
            <Dropdown.Item
              className={dropddownClass}
              style={{ color: "#FF7F50" }}
            >
              <p onClick={() => setEditShow(true)}>編輯名稱</p>
            </Dropdown.Item>
            <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
            <Dropdown.Item className={dropddownClass}>
              <p onClick={() => setDeleteShow(true)}>刪除分類</p>
            </Dropdown.Item>
            <Dropdown.Divider style={{ borderColor: "#EBEBEB" }} />
            <Dropdown.Item className={dropddownClass}>
              <p onClick={() => setShowPodcastModal(true)}>新增Podcast</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <CategoryModal
        show={deleteShow}
        handleClose={() => setDeleteShow(false)}
        handleSaveClick={onDeleteClick}
        title="刪除分類"
        body={
          <div>
            <span>您確定要繼續刪除 </span>
            <span style={{ fontWeight: 700 }}>
              <Emoji unified={icon} size="20" />
              {name}
            </span>
            <span> 的分類嗎？</span>
          </div>
        }
      />
      <CategoryModal
        show={editShow}
        handleClose={() => setEditShow(false)}
        handleSaveClick={onEditClick}
        title="編輯分類"
        body={
          <div className="d-flex gap-3">
            <EmojiInput value={inputEmoji} setInpuEmoji={setInpuEmoji} />
            <CategoryInput
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        }
      />
      {AddPodcast}
    </div>
  );
}

export default EditCategoryBtn;
