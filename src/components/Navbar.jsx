import styles from "./navbar.module.scss";
import FavoriteListButton from "./FavoriteListButton";

const lists = [
  { name: "通勤清單" },
  { name: "學習清單" },
  { name: "睡前清單" },
  { name: "我的Podcast" },
  { name: "已收藏" },
];

function Navbar() {
  const renderedList = lists.map((list) => (
    <FavoriteListButton key={list.name} name={list.name} />
  ));

  return (
    <div className={styles.container_list}>
      <img src="logo.svg" alt="logo" />
      <hr />
      <div className={styles.list_wrap}>
        {renderedList}
        <button className={styles.btn}>
          <span>+</span>新增分類
        </button>
      </div>
    </div>
  );
}

export default Navbar;
