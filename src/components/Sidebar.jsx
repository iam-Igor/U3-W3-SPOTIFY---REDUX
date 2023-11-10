import { Col, Container } from "react-bootstrap";
import logo from "../assets/logo/logo.png";
import { useSelector, useDispatch } from "react-redux";
const Sidebar = () => {
  const fav = useSelector((state) => state.favourites.content);
  const searchInput = useSelector((state) => state.favourites.search);
  const dispatch = useDispatch();

  const handleSection = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          searchInput,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
              "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
          },
        }
      );
      if (response.ok) {
        let { data } = await response.json();

        dispatch({ type: "SET_SEARCH", payload: data.slice(0, 4) });
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Col>
      <nav
        className="navbar navbar-expand-md fixed-left justify-content-between"
        id="sidebar"
      >
        <Container className="flex-column align-items-start">
          <a className="navbar-brand" href="index.html">
            <img src={logo} alt="Spotify Logo" width="131" height="40" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <ul>
                <li>
                  <a
                    className="nav-item nav-link d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-house-door-fill"></i>&nbsp; Home
                  </a>
                </li>
                <li>
                  <a
                    className="nav-item nav-link d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-book-fill"></i>&nbsp; Your Library
                  </a>
                </li>
                <li>
                  <form
                    className="input-group mt-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSection();
                    }}
                  >
                    <input
                      required
                      type="text"
                      className="form-control"
                      id="searchField"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      value={searchInput}
                      onChange={(e) => {
                        dispatch({ type: "SEARCH", payload: e.target.value });
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary btn-sm h-100"
                        type="submit"
                      >
                        GO
                      </button>
                    </div>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="text-white fw-bold overflow-y-auto"
            style={{ maxHeight: "500px" }}
          >
            My Favourites <i className="bi bi-heart-fill ms-3 like-heart "></i>
            <hr></hr>
            {fav.map((song, index) => {
              return (
                <p key={index} className="side-songs">
                  {song}
                </p>
              );
            })}
          </div>
        </Container>
        <div className="nav-btn">
          <button className="btn signup-btn" type="button">
            Sign Up
          </button>
          <button className="btn login-btn" type="button">
            Login
          </button>
          <a href="#">Cookie Policy</a> |<a href="#"> Privacy</a>
        </div>
      </nav>
    </Col>
  );
};

export default Sidebar;
