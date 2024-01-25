import Button from "./Button";

function CardMusicVertical() {
  return (
    <div
      className="shadow-sm border-0"
      style={{ maxWidth: "17.8rem", padding: "1.75rem" }}
    >
      <img
        src="example01.svg"
        style={{ margin: 0, display: "block", maxWidth: "14.3rem" }}
      />
      <div>
        <div style={{ fontSize: "1.4rem", color: "#141416", fontWeight: 700 }}>
          Card Title
        </div>
        <div style={{ fontSize: "1.2rem", color: "#93989A", fontWeight: 400 }}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </div>
        <Button classname="blue">更多</Button>
      </div>
    </div>
  );
}

export default CardMusicVertical;
