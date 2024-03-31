import EditCategoryBtn from "./category/EditCategoryBtn";
import AddNewCategoryModal from "./category/AddNewCategoryModal";
import { Emoji } from "emoji-picker-react";
import { useNavigate, Link } from "react-router-dom";
import useApi from "../contexts/useApi";
import logo from "../../public/logo.svg";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function SideBar() {
  const [toggle, setToggle] = useState(false);
  const { myCategory, nowCategory } = useApi();
  const navigate = useNavigate();

  const btnActive = {
    background: `${nowCategory === "favorite" ? "black" : ""}`,
    color: `${nowCategory === "favorite" ? "white" : ""}`,
    stroke: "white",
  };

  const renderedCategoryList = myCategory?.map((list) => {
    const splitName = list.name.split(",");
    // 測試用
    // console.log(splitName);
    return (
      <EditCategoryBtn
        key={list.id}
        name={splitName[0]}
        icon={splitName[1]}
        id={list.id}
      />
    );
  });

  return (
    <div className="bg-light d-flex flex-column align-items-center sidebar">
      <div className="d-flex align-items-center gap-5">
        <Link to="/mypage">
          <img src={logo} alt="logo" className="w-100 my-5 mx-auto" />
        </Link>
        <div
          className="toggle_label fs-1"
          onClick={() => {
            // console.log(toggle);
            setToggle(!toggle);
          }}
        >
          <FiMenu />
        </div>
      </div>
      <div
        className={`d-flex ${
          !toggle ? "toggle" : ""
        } flex-column align-items-center w-100`}
      >
        <hr className="hr col-9 bg-secondary" />
        <div className="col-10 mt-5">
          {renderedCategoryList}

          <button
            className="d-flex fs-4 align-items-center gap-4 col-12 py-3 btn btn-outline-dark border-0 border-rounded-lg mb-4"
            style={btnActive}
            onClick={() => {
              navigate("/mypage/favorite");
            }}
          >
            <Emoji unified="2764-fe0f" size="20" />
            <div>已收藏</div>
          </button>
          <AddNewCategoryModal />
        </div>
      </div>
    </div>
  );
}
