import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const PageWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <MainNavbar />
      <Container fluid>
        <main>{children}</main>
      </Container>
    </>
  );
};

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom bg-white">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image
            alt=""
            src="/favicon.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Time
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PageWrapper;
