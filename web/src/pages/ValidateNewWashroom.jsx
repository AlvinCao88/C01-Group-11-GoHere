import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./ValidateNewWashroom.css";

const ValidateNewWashroom = () => {
  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState({});
  const nameRef = useRef(null);
  const fullAddressRef = useRef(null);

  async function fetchWashroomReqeust() {
    try {
      const res = await fetch(
        `http://localhost:8000/admin/addWashroom/getRequest/${id}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      console.log(data);

      setRequestDetails(data.response);
    } catch (e) {
      console.log(e);
    }
  }

  async function validateWashroom(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8000/admin/addWashroom/validateRequest/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameRef.current.value,
            fullAddress: fullAddressRef.current.value,
          }),
        },
      );

      if (!res.ok) {
        console.log(await res.json());
        return;
      }

      nameRef.current.value = "";
      fullAddressRef.current.value = "";
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchWashroomReqeust();
  }, []);

  return (
    <div className="container">
      <div className="request-container">
        <div className="input-container">
          <label htmlFor="address">Address</label>
          <input
            className="request-input"
            name="address"
            id="address"
            type="text"
            readOnly
            value={requestDetails.address || ""}
          />
        </div>

        <div className="input-container">
          <label htmlFor="city">City</label>
          <input
            className="request-input"
            name="city"
            id="city"
            type="text"
            readOnly
            value={requestDetails.city || ""}
          />
        </div>

        <div className="input-container">
          <label htmlFor="province">Province</label>
          <input
            className="request-input"
            name="province"
            id="province"
            type="text"
            readOnly
            value={requestDetails.province || ""}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Description</label>
          <textarea
            className="request-input"
            name="description"
            id="description"
            readOnly
            value={requestDetails.description || ""}
          />
        </div>
      </div>
      <div className="validate-container">
        <form onSubmit={validateWashroom} className="validate-form">
          <div className="input-container">
            <label htmlFor="name">Place Name</label>
            <input name="name" id="name" type="text" ref={nameRef} />
          </div>
          <div className="input-container">
            <label htmlFor="full-adderess">Full Address</label>
            <input
              name="full-address"
              id="full-adderess"
              type="text"
              ref={fullAddressRef}
            />
          </div>
          <input id="validate-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ValidateNewWashroom;
