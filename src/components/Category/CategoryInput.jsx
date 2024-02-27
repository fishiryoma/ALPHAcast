function CategoryInput({ onChange, value }) {
  return (
    <div>
      <input
        className="form-control form-control-lg fs-4"
        type="text"
        placeholder="請輸入分類名稱（前方可變更 emoji）"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CategoryInput;
