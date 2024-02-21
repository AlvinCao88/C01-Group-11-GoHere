import Button from "react-bootstrap/Button";

function AdminPage({ mode }) {
  const handleSuperSecretAdminGetRequest = () => {
    //To Do: write a post request
  };

  const redirectToLogin = (e) => {
    e.preventDefault();
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className="d-flex flex-column align-items-center"
        style={{ maxWidth: "100vw", width: "100vw", height: "100vh" }}
      >
        <h1>RESTRICTED ADMIN ACTIONS!!</h1>

        <div
          className="d-flex justify-content-center"
          style={{ width: "800px", marginTop: "8rem" }}
        >
          <Button
            onClick={handleSuperSecretAdminGetRequest}
            style={{ height: "100px" }}
            variant="danger"
            type="submit"
          >
            SUPER SECRET ADMIN RESTRICTED ACTION
          </Button>
          <Button
            onClick={(e) => {
              redirectToLogin(e);
            }}
            style={{ height: "100px" }}
            variant="primary"
            type="submit"
          >
            LOGOUT
          </Button>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
