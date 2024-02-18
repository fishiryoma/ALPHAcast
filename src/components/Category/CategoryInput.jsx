function CategoryInput({ onChange, value }) {
  return (
    <div>
      <input
        className="form-control form-control-lg fs-4 w-full"
        type="text"
        placeholder="請輸入新增分類名稱"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CategoryInput;
