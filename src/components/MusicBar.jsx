import { Col, Container, Row } from "react-bootstrap";
import shuffle from "../assets/playerbuttons/shuffle.png";
import prev from "../assets/playerbuttons/prev.png";
import play from "../assets/playerbuttons/play.png";
import next from "../assets/playerbuttons/next.png";
import repeat from "../assets/playerbuttons/repeat.png";
import { useSelector } from "react-redux";

const MusicBar = () => {
  const barAlbum = useSelector((state) => state.favourites.musicBar[0]);

  return (
    <Container fluid className="fixed-bottom bg-container pt-2">
      <Row className="h-100">
        <Col className="col-lg-10 offset-lg-2">
          <Row className="row h-100 flex-row align-items-center p-2">
            {barAlbum ? (
              <Col className="text-white col-4 flex-row d-flex">
                <div>
                  <img src={barAlbum.album.cover_small} />
                </div>
                <div className="album-bar-text ms-2">
                  <p className="fw-bold">{barAlbum.title}</p>
                  <p>{barAlbum.artist.name}</p>
                </div>
              </Col>
            ) : (
              <Col className="text-white col-4 flex-row d-flex">
                <div>
                  <img src="" />
                </div>
                <div className="album-bar-text ms-2">
                  <p className="fw-bold"></p>
                  <p></p>
                </div>
              </Col>
            )}

            <Col className="col-6 col-md-4 playerControls mb-2">
              <div className="d-flex">
                <a href="#">
                  <img src={shuffle} alt="shuffle" />
                </a>
                <a href="#">
                  <img src={prev} alt="prev" />
                </a>
                <a href="#">
                  <img src={play} alt="play" />
                </a>
                <a href="#">
                  <img src={next} alt="next" />
                </a>
                <a href="#">
                  <img src={repeat} alt="repeat" />
                </a>
              </div>
              <div className="progress mt-3">
                <div role="progressbar"></div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MusicBar;
