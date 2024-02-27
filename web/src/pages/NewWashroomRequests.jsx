import { useEffect } from "react";
import { useState } from "react";

const NewWashroomRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getWashroomRequests() {
      try {
        const res = await fetch(
          `http://localhost:8000/admin/addWashroom/getManyRequests`,
        );

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
    <div>
      {requests &&
        requests.map((e) => (
          <div key={e._id}>
            {e.address}
            {e.city}
            {e.province}
            {e.description}
          </div>
        ))}
    </div>
  );
};

export default NewWashroomRequests;
