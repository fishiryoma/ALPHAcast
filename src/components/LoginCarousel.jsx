import Carousel from "react-bootstrap/Carousel";

const text = [
  {
    title: "鼓舞人心的故事",
    text: "從非凡的人生故事和成功經歷中獲得靈感",
    img: "carousel01.svg",
    bg: "#23262F",
  },
  {
    title: "輕鬆分類與管理",
    text: "一目瞭然的分類，讓收藏的Podcast保持整潔",
    img: "carousel02.svg",
    bg: "#2D3831",
  },
  {
    title: "Spotify 快速同步",
    text: "透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽",
    img: "carousel03.svg",
    bg: "#063540",
  },
];

export default function LoginCarousel() {
  const rendered = text.map((item) => (
    <Carousel.Item key={item.img} style={{ height: "100vh" }}>
      <div
        className="d-flex w-100 justify-content-center align-items-center h-100"
        style={{ backgroundColor: item.bg }}
      >
        <img
          src={item.img}
          style={{ width: "50%", transform: "translateY(-25%)" }}
        />
      </div>
      <Carousel.Caption style={{ bottom: "10rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "4.2rem" }}>{item.title}</h3>
        <p style={{ fontWeight: 400, fontSize: "1.6rem", marginTop: "3rem" }}>
          {item.text}
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return <Carousel>{rendered}</Carousel>;
}
