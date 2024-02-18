function NowPlayingShow({ handleClose }) {
  return (
    <div className="d-flex gap-4 p-4">
      <img src="example01.svg" style={{ width: "12.8rem" }} />
      <div className="d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="fs-4 fw-bold">Card Title</div>
            <button
              type="button"
              className="btn-close fs-4"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="text-gray-500 fs-5 mt-1">
            Some quick example text to build on the card title and make up the
            bulk of the
          </div>
        </div>
        <div className="text-end">
          <button className="btn btn-outline-danger mt-2 fs-5 ">刪除</button>
        </div>
      </div>
    </div>
  );
}

export default NowPlayingShow;
