function ShowCardSm({ info }) {
  return (
    <div className="shadow rounded-3 p-4" style={{ width: "16.5rem" }}>
      <div className="">
        <img
          src={info.images[1].url}
          className="rounded-3"
          style={{ width: "13.5rem" }}
        />
      </div>
      <div>
        <div className="fs-5 fw-bold mt-3">{info.name}</div>
        <div className="text-gray-500 fs-5 mt-1">{info.publisher}</div>
      </div>
    </div>
  );
}

export default ShowCardSm;
