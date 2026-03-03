import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/authContext";


import LandingPage from "./pages/landingPage"
import UserLogin from "./pages/userLogin"
import AdminLogin from "./pages/adminLogin"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App