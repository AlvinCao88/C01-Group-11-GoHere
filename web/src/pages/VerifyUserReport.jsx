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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: nameRef.current.value,
            fullAddress: fullAddressRef.current.value,
          }),
        },
      );

      if (!res.ok) {
        console.log(await res.json());
        setIsError(true);
        setLoading(false);
        return;
      }

      nameRef.current.value = "";
      fullAddressRef.current.value = "";
      setIsError(false);
      setLoading(false);

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
          <Form.Label>Address</Form.Label>
          <Form.Control value={requestDetails.address || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control value={requestDetails.city || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Province</Form.Label>
          <Form.Control value={requestDetails.province || ""} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="textarea"
            as="textarea"
            rows={4}
            value={requestDetails.description || ""}
            disabled
          />
        </Form.Group>
      </div>

      <Form onSubmit={verifyReports}>
        <Form.Group className="mb-3">
          <Form.Label>Name on Google Maps</Form.Label>
          <Form.Control type="text" placeholder="Tim Hortons" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Full Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address, City, Province Postal Code, Country"
            ref={fullAddressRef}
          />
        </Form.Group>
        <Button className="text-white" type="submit">
          {loading ? <Spinner size="sm" /> : "Submit"}
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

export default ValidateNewWashroom;
