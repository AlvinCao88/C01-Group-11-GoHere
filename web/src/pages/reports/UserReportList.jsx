import { useEffect, useState } from "react";
import { Button, Col, Modal, Container, Row } from "react-bootstrap";
import "./UserReportList.css";
import { Link } from "react-router-dom";

const NewUserReports = () => {
  const [userReports, setUserReports] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRemoveRequest = (id) => {
     removeReport(id);
  }


  useEffect(() => {
    async function getUserReports() {
      try {
        const res = await fetch("/api/v1/admin/userReport/getAll", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log(data);

        setUserReports(data.response);
      } catch (e) {
        console.log("Error fetching user reports:", e);
      }
    }
    getUserReports();
  }, []);

  async function removeReport() {
    try {
      const res = await fetch(`/api/v1/admin/userReport/remove/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      window.location.href = '/verify/reports'

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
          <Button className="text-white" variant="danger" onClick={handleRemoveRequest}>
            Delete Request
          </Button>
        </Modal.Footer>
      </Modal>

    <Container className="mt-5">
      <h3 className="mb-5">User Update Reports Sent by Users</h3>
      <Row className="list-header">
        <Col xs={3}>Name</Col>
        <Col>Issue</Col>
        <Col xs={2}>Controls</Col>
        <hr className="my-3" />
      </Row>
      {userReports && userReports.length !== 0 ? (
        userReports.map((report) => (
          <Row direction="horizontal" gap={3} key={report._id}>
            <Col>{report.name  || "Anonymous"}</Col>
            <Col xs = {7}>{report.issue}</Col>
            <Col xs={2}>
              {!report.status ? 
              <Button variant="success">
                <Link className="link" to={`/verify/report/${report._id}`}>
                  Validate
                </Link>
              </Button> : <div>Validated</div>
              } 
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => {
                    setDeleteId(report._id);
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
        <h3 className="text-center mt-5">No User Reports</h3>
      )}
    </Container>
    </>
  );
};

export default NewUserReports;
