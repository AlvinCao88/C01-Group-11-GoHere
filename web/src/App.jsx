import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import MainPageLayout from "./components/MainPageLayout";
import ValidateNewWashroom from "./pages/ValidateNewWashroom";
import NewWashroomRequest from "./pages/NewWashroomRequests";
import "./custom.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage mode={"signup"} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<MainPageLayout />}>
            <Route
              path="/validate/washrooms"
              element={<NewWashroomRequest />}
            />
            <Route
              path="/validate/washroom/:id"
              element={<ValidateNewWashroom />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
