import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: darkMode ? "#121212" : "#F5F7FB",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      {!hideSidebar && isLoggedIn && <Sidebar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: hideSidebar ? 0 : 3,
          overflow: "auto",
        }}
      >
        <Routes>

          {/* Register */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Login */}

          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          {/* Protected Routes */}

          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/properties"
            element={
              isLoggedIn ? (
                <Properties />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/tenants"
            element={
              isLoggedIn ? (
                <Tenants />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/payments"
            element={
              isLoggedIn ? (
                <Payments />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/reports"
            element={
              isLoggedIn ? (
                <Reports />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
  path="/settings"
  element={
    <Settings
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      setIsLoggedIn={setIsLoggedIn}
    />
  }
/>

          {/* Default */}

          <Route
            path="*"
            element={
              <Navigate
                to={isLoggedIn ? "/" : "/login"}
                replace
              />
            }
          />

        </Routes>
      </Box>
    </Box>
  );
}

export default App;