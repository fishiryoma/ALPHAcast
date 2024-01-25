import { FaBookmark } from "react-icons/fa6";

function CardPlayMusic() {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const options = {
      uri: "spotify:episode:7makk4oTQel546B0PZlDM5",
    };
    const element = document.getElementById("embed-iframe");

    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div className="p-4 shadow-sm border-0 bg-white">
      <div className="bg-white">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "2.4rem",
              fontWeight: 500,
              color: "#1A202C",
              margin: 0,
            }}
          >
            現正撥放
          </p>
          <FaBookmark style={{ fontSize: "1.4rem", color: "#FF7F50" }} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#111111" }}>
          Special title treatment
        </div>
        <div style={{ fontSize: "1.2rem", fontWeight: 400, color: "#718096" }}>
          With supporting text below as a natural lead-in to additional content.
        </div>
        {/* ------------------- */}
        <div className="w-full">
          <div id="embed-iframe"></div>
        </div>
      </div>
    </div>
  );
}

export default CardPlayMusic;
