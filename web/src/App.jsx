import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainPageLayout from "./components/MainPageLayout";
import Loading from "./components/Loading";
import "./custom.scss";
import LoginPage from "./pages/LoginPage";
import NewWashroomRequest from "./pages/NewWashroomRequests";
import ValidateNewWashroom from "./pages/ValidateNewWashroom";
import UserReportList from "./pages/UserReportList";
import NewBusinessRequests from "./pages/NewBusinessRequests";
import ValidateNewBusiness from "./pages/ValidateNewBusiness";
import VerifyUserReport from "./pages/VerifyUserReport"

async function checkIsAdmin() {
  try {
    const res = await fetch("/api/v1/admin/isAdmin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkIsAdmin().then((res) => {
      console.log("Logged In:", res);
      setIsAdmin(res);
      setIsLoading(false);
    });
  }, []);

  // This screen is here so we don't see a sudden "flash" of the login page
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              !isAdmin ? <Outlet /> : <Navigate to="/validate/washrooms" />
            }
          >
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage mode={"signup"} />} />
          </Route>

          <Route
            element={isAdmin ? <MainPageLayout /> : <Navigate to="/login" />}
          >
            <Route
              path="/validate/washrooms"
              element={<NewWashroomRequest />}
            />
            <Route
              path="/validate/washroom/:id"
              element={<ValidateNewWashroom />}
            />
            <Route
              path="/verify/reports"
              element={<UserReportList />}
            />
             <Route
              path="/verify/report/:id"
              element={<VerifyUserReport />}
            />

            <Route
              path="/validate/businesses"
              element={<NewBusinessRequests />}
            />
            <Route
              path="/validate/business/:id"
              element={<ValidateNewBusiness />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
