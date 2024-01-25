import Carousel from "react-bootstrap/Carousel";

function LoginCarousel() {
  return (
    <Carousel>
      <Carousel.Item style={{ height: "100vh" }}>
        <div
          className="d-flex w-100 justify-content-center align-items-center h-100"
          style={{ backgroundColor: "#23262F" }}
        >
          <img
            src="carousel01.svg"
            style={{ width: "70%", transform: "translateY(-25%)" }}
          />
        </div>
        <Carousel.Caption style={{ bottom: "10rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "4.2rem" }}>
            鼓舞人心的故事
          </h3>
          <p style={{ fontWeight: 400, fontSize: "1.6rem", marginTop: "3rem" }}>
            從非凡的人生故事和成功經歷中獲得靈感
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: "100vh" }}>
        <div
          className="d-flex w-100 justify-content-center align-items-center h-100"
          style={{ backgroundColor: "#2D3831" }}
        >
          <img
            src="carousel02.svg"
            style={{ width: "70%", transform: "translateY(-25%)" }}
          />
        </div>
        <Carousel.Caption style={{ bottom: "10rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "4.2rem" }}>
            輕鬆分類與管理
          </h3>
          <p style={{ fontWeight: 400, fontSize: "1.6rem", marginTop: "3rem" }}>
            一目瞭然的分類，讓收藏的Podcast保持整潔
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: "100vh" }}>
        <div
          className="d-flex w-100 justify-content-center align-items-center h-100"
          style={{ backgroundColor: "#063540" }}
        >
          <img
            className=""
            src="carousel03.svg"
            style={{ width: "70%", transform: "translateY(-25%)" }}
          />
        </div>
        <Carousel.Caption style={{ bottom: "10rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "4.2rem" }}>
            Spotify 快速同步
          </h3>
          <p style={{ fontWeight: 400, fontSize: "1.6rem", marginTop: "3rem" }}>
            透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default LoginCarousel;
