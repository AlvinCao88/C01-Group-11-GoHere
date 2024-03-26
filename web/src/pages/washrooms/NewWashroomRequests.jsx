import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import "./NewRequests.css";
import { Link } from "react-router-dom";

const NewWashroomRequests = () => {
  const [requests, setRequests] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRemoveRequest = (id) => {
     removeWashroomRequest(id);
  }

  async function removeWashroomRequest() {
    try {
      const res = await fetch(`/api/v1/admin/removeWashroom/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.href = '/validate/washrooms'

    } catch (e) {
      console.log(e);
    }
  }

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

  return (<>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Business Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="text-white" variant="primary" onClick={handleRemoveRequest}>
            Delete Request
          </Button>
        </Modal.Footer>
      </Modal>

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
              <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => {
                    setDeleteId(e._id);
                    setShow(true);
                  }}
                >
                  Reject
                </Button>
            </Col>
            <hr className="my-3" />
          </Row>
        ))
      ) : (
        <h3 className="text-center mt-5">No Requests</h3>
      )}
    </Container>
    </>);
};

export default NewWashroomRequests;
