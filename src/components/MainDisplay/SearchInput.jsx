import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { searchItem } from "../../api/auth-spotify";

function SearchInput({ setSearchItems }) {
  const [input, setInput] = useState("");

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await searchItem(input);
        console.log(res.items);
        setSearchItems(res.items);
      } catch (err) {
        console.log(`Search failed ${err}`);
      }
    }
  };

  return (
    <div className="input-group mb-3 p-2">
      <div className="input-group-text border-0 border-rounded-lg">
        <IoIosSearch className="fs-3 text-secondary" />
      </div>
      <input
        type="text"
        className="form-control form-control-lg bg-light border-0 border-rounded-lg fs-4"
        placeholder="開始搜尋..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default SearchInput;
