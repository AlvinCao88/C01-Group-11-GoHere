import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ValidateNewWashroom from "./pages/ValidateNewWashroom"
import NewWashroomRequest from "./pages/NewWashroomRequests"
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage mode={"signup"} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/validate/washrooms" element={ <NewWashroomRequest/> }/>
          <Route path="/validate/washroom/:id" element={ <ValidateNewWashroom/> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
