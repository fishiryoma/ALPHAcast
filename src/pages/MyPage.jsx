import AddNewCategoryModal from "../components/category/AddNewCategoryModal.jsx";
import useApi from "../contexts/useApi.jsx";

export default function ShowPage() {
  const { myCategory } = useApi();

  return (
    <div className="d-flex flex-column align-items-center gap-5">
      <img src="search.svg" alt="search icon" />
      <p className="text-secondary fs-3 fw-bold ">
        {myCategory.length
          ? "開始享受音樂吧"
          : "您尚未有任何分類，可以點擊按鈕新增！"}
      </p>
      <div>
        <AddNewCategoryModal />
      </div>
    </div>
  );
}
