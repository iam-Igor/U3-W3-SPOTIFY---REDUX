import { Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const MainPage = () => {
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <MainContent />
      </Row>
    </Container>
  );
};

export default MainPage;
