import { useEffect, useRef, useState } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./VerifyUserReport.css";

const VerifyUserReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState({});
  const [washroomDetails, setWashroomDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchUserReport() {
      try {
        const res = await fetch(`/api/v1/admin/userReport/get/${id}`, {
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

        setRequestDetails(data.response);

        return data.response.washroomId; // return the id so we can use it
      } catch (e) {
        console.log(e);
        navigate("/verify/reports");
      }
    }

    async function fetchWashroomDetails(washroomId) {
      try {
        const res = await fetch(`/api/v1/user/query/washrooms/${washroomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!data || !data.response) {
          navigate("/verify/reports");
        }

        console.log(data);

        setWashroomDetails(data.response);
      } catch (e) {
        console.log(e);
        navigate("/verify/reports");
      }
    }

    fetchUserReport().then((id) => {
      fetchWashroomDetails(id);
    });
  }, [id, navigate]);

  async function verifyReports(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await fetch(`/api/v1/admin/userReport/validateRequest/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(washroomDetails),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
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
          <Form.Control value={requestDetails.name || "Anonymous"} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={requestDetails.phoneNum || "Anonymous"}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control value={requestDetails.email || "Anonymous"} disabled />
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
        <Form.Group className="mb-3">
          <Form.Label>Washroom Name</Form.Label>
          <Form.Control
            type="text"
            disabled
            value={washroomDetails.name || ""}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Washroom Address</Form.Label>
          <Form.Control
            type="text"
            disabled
            value={washroomDetails.fullAddress || ""}
          />
        </Form.Group>

        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((e, i) => (
          <Form.Group className="mb-3" key={i}>
            <Form.Label>{e}</Form.Label>
            <Form.Control
              type="text"
              value={
                washroomDetails.hours ? washroomDetails.hours[i] || "" : ""
              }
              onChange={(e) => {
                setWashroomDetails((prev) => {
                  const newTime = { ...prev };
                  newTime.hours[i] = e.target.value;
                  return newTime;
                });
              }}
            />
          </Form.Group>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={
              washroomDetails.contact
                ? washroomDetails.contact.number || ""
                : ""
            }
            onChange={(e) => {
              setWashroomDetails((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, number: e.target.value },
                };
              });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website URL</Form.Label>
          <Form.Control
            type="text"
            value={
              washroomDetails.contact
                ? washroomDetails.contact.website || ""
                : ""
            }
            onChange={(e) => {
              setWashroomDetails((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, website: e.target.value },
                };
              });
            }}
          />
        </Form.Group>

        <Button className="text-white" variant="success" type="submit">
          {loading ? <Spinner size="sm" /> : "Validate"}
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
