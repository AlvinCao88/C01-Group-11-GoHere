import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./NewRequests.css";
import { Link } from "react-router-dom";

const NewWashroomRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getWashroomRequests() {
      try {
        const res = await fetch(`/api/v1/admin/addWashroom/getManyRequests`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log(data);

        setRequests(data.response);
      } catch (e) {
        console.log(e);
      }
    }

    getWashroomRequests();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="mb-5">Washroom Requests Sent by Users</h3>
      <Row className="list-header">
        <Col xs={3}>Location</Col>
        <Col>Description</Col>
        <Col xs={2}>Controls</Col>
        <hr className="my-3" />
      </Row>
      {requests && requests.length != 0 ? (
        requests.map((e) => (
          <Row direction="horizontal" gap={3} key={e._id}>
            <Col xs={3}>
              {e.address}, {e.city}, {e.province}
            </Col>
            <Col>{e.description}</Col>
            <Col xs={2}>
              <Button variant="primary">
                <Link className="link" to={`/validate/washroom/${e._id}`}>
                  Validate
                </Link>
              </Button>
            </Col>
            <hr className="my-3" />
          </Row>
        ))
      ) : (
        <h3 className="text-center mt-5">No Requests</h3>
      )}
    </Container>
  );
};

export default NewWashroomRequests;
