import { useEffect, useRef, useState } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./VerifyUserReport.css";

const VerifyUserReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const nameRef = useRef(null);
  const fullAddressRef = useRef(null);

  useEffect(() => {
    async function fetchUserReport() {
      try {
        const res = await fetch(`/api/v1/admin/getReports/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (!data || !data.response) {
          navigate("/verify/reports");
        }

        console.log(data);

        setRequestDetails(data.response);
      } catch (e) {
        console.log(e);
        navigate("/verify/reports");
      }
    }

    fetchUserReport();
  }, [id, navigate]);

  async function verifyReports(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/v1/admin/verifyReports/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,

          },
        },
      );
      if (!res.ok) {
        throw new Error('Failed to update status');
      }
      navigate("/verify/reports");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setIsError(true);
    }
  }

  return (
    <Stack gap={5} className="m-5 all-container">
    <div className="position-relative p-5 border border-5 border-primary rounded-5">
      <p className="request-id bg-primary text-white">
        Request ID: {requestDetails._id}
      </p>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control value={requestDetails.name || ""} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control value={requestDetails.phoneNum || ""} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control value={requestDetails.email || ""} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Issue Description</Form.Label>
        <Form.Control
          className="textarea"
          as="textarea"
          rows={4}
          value={requestDetails.issue || ""}
          disabled
        />
      </Form.Group>
    </div>

    <Form onSubmit={verifyReports}>
      <Button className="text-white" type="submit">
        {loading ? <Spinner size="sm" /> : "Verify"}
      </Button>

      {isError && (
        <div className="text-primary mt-3">
          An error occured, please try again.
        </div>
      )}
    </Form>
  </Stack>
  );
};

export default VerifyUserReport;
