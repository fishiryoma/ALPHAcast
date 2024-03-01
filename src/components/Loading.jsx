import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="position-relative">
      <div
        className="position-absolute d-flex flex-column justify-content-center align-items-center w-100"
        style={{
          top: "20vh",
        }}
      >
        <Spinner
          animation="border"
          variant="info"
          className="m-5"
          style={{
            width: "6rem",
            height: "6rem",
            borderWidth: "1rem",
          }}
        />
      </div>
    </div>
  );
}
