import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SingleAlbum from "./SingleAlbum";
import { useSelector } from "react-redux";

const MainContent = () => {
  const [staticData, setStaticData] = useState([]);
  const searchData = useSelector((state) => state.favourites.searchData[0]);
  const searchInput = useSelector((state) => state.favourites.search);
  const [isLoading, setIsLoading] = useState(true);

  const handleSection = async (artistName) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
          artistName,
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

        setIsLoading(false);

        return data.slice(0, 4);
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.log("error", err);
      setIsLoading(false);
    }
  };

  console.log(staticData);

  useEffect(() => {
    const fetchData = async () => {
      const rockData = await handleSection("queen");
      const popData = await handleSection("madonna");
      const hipHopData = await handleSection("eminem");

      const combinedData = [
        rockData.slice(0, 4),
        popData.slice(0, 4),
        hipHopData.slice(0, 4),
      ];

      setStaticData(combinedData);
    };

    fetchData();
  }, []);

  return (
    <Col className="col-12 col-md-9 offset-md-3 mainPage">
      <Row>
        <Col className="col-9 col-lg-11 mainLinks d-none d-md-flex">
          <a href="#">TRENDING</a>
          <a href="#">PODCAST</a>
          <a href="#">MOODS AND GENRES</a>
          <a href="#">NEW RELEASES</a>
          <a href="#">DISCOVER</a>
        </Col>
      </Row>
      <Row>
        <Col className="col-10">
          <div id="searchResults">
            {" "}
            {searchData && (
              <>
                <h2>Results for: {searchInput}</h2>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                  {searchData.map((album, index) => {
                    return <SingleAlbum key={index} album={album} />;
                  })}
                </Row>
              </>
            )}
          </div>
        </Col>
      </Row>

      {isLoading ? (
        <div className="spinner offset-5"></div>
      ) : (
        <>
          <Row className="row">
            <Col className="col-10">
              <div id="rock">
                <h2>Rock classics</h2>
                {staticData[0] && (
                  <Row
                    className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                    id="rockSection"
                  >
                    {staticData[0].map((album, index) => {
                      return <SingleAlbum key={index} album={album} />;
                    })}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-10">
              <div id="pop">
                <h2>Pop Culture</h2>
                {staticData[1] && (
                  <Row
                    className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                    id="popSection"
                  >
                    {staticData[1].map((album, index) => {
                      return <SingleAlbum key={index} album={album} />;
                    })}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col className="col-10">
              <div id="hiphop">
                <h2>#HipHop</h2>
                {staticData[2] && (
                  <Row
                    className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3"
                    id="hiphopSection"
                  >
                    {staticData[2].map((album, index) => {
                      return <SingleAlbum key={index} album={album} />;
                    })}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </Col>
  );
};

export default MainContent;
