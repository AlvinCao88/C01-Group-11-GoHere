import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Col, Container, Row } from "react-bootstrap";
import "./NewRequests.css";
import { Link } from "react-router-dom";

const NewBusinessRequests = () => {
  const [requests, setRequests] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRemoveRequest = (id) => {
     removeBusinessRequest(id);
  }

  useEffect(() => {
    async function getBusinessRequests() {
      try {
        const res = await fetch(`/api/v1/admin/addBusiness/getManyRequests`, {
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

    getBusinessRequests();
  }, []);

  async function removeBusinessRequest() {
    try {
      const res = await fetch(`/api/v1/admin/removeBusiness/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.href = '/validate/businesses'

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
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
        <h3 className="mb-5">Business Requests Sent by Users</h3>
        <Row className="list-header">
          <Col xs={2}>Business Name</Col>
          <Col xs={5}>Contact Details</Col>
          <Col xs={3}>Location</Col>
          <Col xs={2}>Controls</Col>
          <hr className="my-3" />
        </Row>
        {requests && requests.length != 0 ? (
          requests.map((e) => (
            <Row direction="horizontal" gap={3} key={e._id}>
              <Col xs={2}>{e.businessName}</Col>
              <Col
                xs={5}
              >{`${e.contactName}, ${e.email}, ${e.phoneNumber}`}</Col>
              <Col xs={3}>
                {e.address}, {e.city}, {e.province}
              </Col>
              <Col xs={2}>
                <Button className="m-2" variant="success">
                  <Link className="link" to={`/validate/business/${e._id}`}>
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
    </>
  );
};

export default NewBusinessRequests;
