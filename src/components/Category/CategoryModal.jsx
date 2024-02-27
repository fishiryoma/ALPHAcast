import Modal from "react-bootstrap/Modal";

export default function CategoryModal({
  show,
  handleClose,
  handleSaveClick,
  ...rest
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="md">
        <Modal.Header closeButton>
          <h3 className="modal-title fw-bold">{rest.title}</h3>
        </Modal.Header>
        <div style={{ height: "20rem" }} className="fs-4">
          <Modal.Body>{rest.body}</Modal.Body>
        </div>
        <Modal.Footer>
          <button
            className="btn fs-4 btn_lg border-rounded-lg"
            onClick={handleClose}
          >
            取消
          </button>
          <button
            className="btn btn-orange-500 text-white fs-4 btn_lg border-rounded-lg"
            onClick={handleSaveClick}
          >
            儲存
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
