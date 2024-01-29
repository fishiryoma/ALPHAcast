import Modal from "react-bootstrap/Modal";
import Button from "../Button";

function CategoryModal({ show, handleClose, handleInputClick, ...rest }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{rest.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{rest.body}</Modal.Body>
        <Modal.Footer>
          <Button classname="white" onClick={handleClose}>
            取消
          </Button>
          <Button classname="orange" onClick={handleInputClick}>
            儲存
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryModal;
