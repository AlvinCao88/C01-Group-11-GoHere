import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./UserReportList.css";
import { Link } from "react-router-dom";

const NewUserReports = () => {
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    async function getUserReports() {
      try {
        const res = await fetch("/api/v1/admin/getAllUserReports", {
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

  return (
    <Container className="mt-5">
      <h3 className="mb-5">User Update Reports Sent by Users</h3>
      <Row className="list-header">
        <Col xs={3}>Location</Col>
        <Col>Description</Col>
        <Col xs={2}>Controls</Col>
        <hr className="my-3" />
      </Row>
      {userReports && userReports.length !== 0 ? (
        userReports.map((report) => (
          <Row direction="horizontal" gap={3} key={report._id}>
            <Col>{report.address}</Col>
            <Col>{report.description}</Col>
            <Col xs={2}>
              <Button variant="primary">
                <Link className="link" to={`/verifyReports/${report._id}`}>
                  Verify
                </Link>
              </Button>
            </Col>
            <hr className="my-3" />
          </Row>
        ))
      ) : (
        <h3 className="text-center mt-5">No User Reports</h3>
      )}
    </Container>
  );
};

export default NewUserReports;
