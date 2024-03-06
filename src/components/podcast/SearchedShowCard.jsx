import thumbImg from "../../../public/thumbImg.svg";
import { ShortenText } from "../Helper";

export default function SearchedShowCard({ info, isSelected, setIsSeleted }) {
  return (
    <div
      className="shadow rounded-3 p-4 scrollbar"
      style={{
        width: "16.5rem",
        outline: `${isSelected === info?.id ? "solid 2px #FF7F50" : ""}`,
        maxHeight: "25rem",
        overflowY: "hidden",
      }}
      onClick={() => setIsSeleted(info.id)}
    >
      <div>
        <img
          src={info?.images[1].url ? info?.images[1].url : thumbImg}
          className="rounded-3"
          style={{ width: "13.5rem", height: "13.5rem" }}
        />
      </div>
      <div>
        <div className="fs-5 fw-bold mt-3">
          <ShortenText text={info.name} maxLength={30} />
        </div>
        <div className="text-gray-500 fs-5 mt-1">
          <ShortenText text={info.publisher} maxLength={13} />
        </div>
      </div>
    </div>
  );
}
