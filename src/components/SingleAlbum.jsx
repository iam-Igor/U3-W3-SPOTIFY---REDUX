import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SingleAlbum = ({ album }) => {
  const dispatch = useDispatch();

  return (
    <Col className="text-center position-relative">
      <img className="img-fluid " src={album.album.cover_medium} alt="track" />
      <i
        className="bi bi-heart-fill fs-3 like-heart position-absolute"
        onClick={() => {
          dispatch({ type: "ADD_TO_FAV", payload: album.title });
        }}
      ></i>

      <div className="lh-1 ">
        <p
          className="text-song"
          onClick={() => {
            dispatch({ type: "ADD_TO_BAR", payload: album });
          }}
        >
          {album.title}{" "}
        </p>
        <p>{album.artist.name}</p>
      </div>
    </Col>
  );
};

export default SingleAlbum;
