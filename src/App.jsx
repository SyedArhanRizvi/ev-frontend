import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Home from "./Screens/Landing/Home";
import LoginPage from "./Screens/Log/LoginPage";
import RegisterPage from "./Screens/Log/RegisterPage";
import Admin from "./Screens/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import MapView from "./components/MapView";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login-page" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/register-page"
          element={<RegisterPage></RegisterPage>}
        ></Route>
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute>
              <Admin></Admin>
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/ev-map"
          element={
            <ProtectedRoute>
              <MapView></MapView>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
