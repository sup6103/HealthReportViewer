import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import HealthReportViewer from "./HealthReportViewer";
import { setToken } from "./auth";


const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      navigate("/health-report");
    }else{
      navigate("/login");
    }
  }, [location, navigate]);

  return <div className="text-center mt-20">Redirecting...</div>;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectHandler />} />
        <Route path="/health-report" element={<HealthReportViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
