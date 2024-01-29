import Form from "react-bootstrap/Form";

function CategoryInput({ input, onChange, value }) {
  return (
    <div>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Normal text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CategoryInput;
