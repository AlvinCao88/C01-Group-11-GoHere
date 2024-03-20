import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const MainPageLayout = () => {
  return (
    <Stack>
      <Navbar>
        <Container fluid>
          <Navbar.Brand>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            GoHere
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/validate/washrooms">New Washrooms</Nav.Link>
            <Nav.Link href="/verify/reports">Washroom Updates</Nav.Link>
            <Nav.Link href="/validate/businesses">New Businesses</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Stack>
  );
};

export default MainPageLayout;
