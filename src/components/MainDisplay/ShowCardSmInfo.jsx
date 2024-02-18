function ShowCardSmInfo({ handleOpen }) {
  return (
    <div
      className="shadow rounded-3"
      style={{ maxWidth: "17.8rem", padding: "1.75rem" }}
    >
      <img src="example01.svg" />

      <div>
        <div className="fs-5 fw-bold mt-2">Card Title</div>
        <div className="text-gray-500 fs-5 mt-1">
          Some quick example text to build on the card title and make up the
          bulk of the
        </div>
        <button
          className="btn btn-info text-white mt-2 fs-5"
          onClick={handleOpen}
        >
          更多
        </button>
      </div>
    </div>
  );
}

export default ShowCardSmInfo;
