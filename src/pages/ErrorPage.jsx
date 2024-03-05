import { RiErrorWarningLine } from "react-icons/ri";
import logo from "../../public/logo.png";

export default function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <div className="text-danger text-center" style={{ marginTop: "40vh" }}>
      <RiErrorWarningLine style={{ width: "5rem", height: "5rem" }} />
      <p className="m-3 fs-1 fw-bold">發生了一些未知的錯誤</p>
      <p className="fs-3">{error.message}</p>
      <button
        className="btn btn-danger mt-4 btn-lg px-5 py-3"
        onClick={resetErrorBoundary}
      >
        再試一次
      </button>
      <div>
        <img
          src={logo}
          alt="logo"
          style={{ width: "12rem" }}
          className="mt-5"
        />
      </div>
    </div>
  );
}
