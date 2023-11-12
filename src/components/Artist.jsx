import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Artist = () => {
  const urlParams = useParams();
  const [artistData, setArtistData] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  console.log(artistData);
  console.log(artistInfo);

  const getArtistData = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
        urlParams.artistId +
        "/top?limit=8",

      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          "X-RapidAPI-Key":
            "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error in fetching artist data");
        }
      })
      .then((data) => {
        console.log(data);
        setArtistData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        console.log(data);
        setArtistInfo(data.slice(0, 1));

        // qui ritorno direttamnente l'array senza settare lo state in quanto viene settato nello use effect
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getArtistData();
  }, []);

  useEffect(() => {
    if (artistData.length > 0) {
      handleSection(artistData[0].artist.name);
    }
  }, [artistData]);

  return (
    <Container fluid>
      {artistData && (
        <Row className="flex-column artist-row">
          <Sidebar />
          <Col
            style={{
              backgroundImage: artistInfo[0]
                ? `url(${artistInfo[0].artist.picture_big})`
                : "none",
              backgroundSize: "cover",
            }}
            className="p-5 text-white"
          >
            <h5 className="py-5">Verified Artist</h5>
            <h1>{artistData[0] ? artistData[0].artist.name : "null"}</h1>
            <p className="pb-5">
              {artistInfo[0] ? artistInfo[0].rank : "null"} Ascoltatori mensili
            </p>
          </Col>
          {artistData.map((track, index) => {
            return (
              <Col key={index} className="text-white d-flex my-2">
                <div className="d-flex">
                  <p className="me-3">{index + 1}</p>
                  <img src={track.album.cover_small} alt="album-cover" />
                </div>
                <div className="d-flex justify-content-between w-100">
                  <div className="w-50 ms-3">
                    <p>{track.title}</p>
                  </div>
                  <div>
                    <p>{track.rank}</p>
                  </div>
                  <div>
                    <p>{track.duration}</p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Artist;
