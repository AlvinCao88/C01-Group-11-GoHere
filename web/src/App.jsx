import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage mode={'signup'} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
