import { createContext, useState, useEffect } from "react";
import { getCategory, createCategory, deleteCategory } from "../api/acApi";

const ApiContext = createContext();

const lists = [
  { name: "通勤清單" },
  { name: "學習清單" },
  { name: "睡前清單" },
  { name: "我的Podcast" },
  { name: "已收藏" },
];

function ApiProvider({ children }) {
  const [myCategory, setMyCategory] = useState(lists);

  useEffect(() => {
    const getMyCategory = async () => {
      try {
        const res = await getCategory();
        setMyCategory([...myCategory, ...res]);
      } catch (err) {
        console.log(err);
      }
    };
    getMyCategory();
  }, []);

  const OnCreatCategory = async (name) => {
    try {
      const res = await createCategory(name);
      const updatedCategory = await getCategory();
      console.log(updatedCategory);
      setMyCategory([...lists, ...updatedCategory]);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const OnDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      const updatedCategory = myCategory.filter(
        (category) => category.id !== id
      );
      setMyCategory(updatedCategory);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ApiContext.Provider
      value={{ myCategory, setMyCategory, OnCreatCategory, OnDeleteCategory }}
    >
      {children}
    </ApiContext.Provider>
  );
}
export default ApiContext;
export { ApiProvider };
