import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Home from './Screens/Landing/Home';
import LoginPage from './Screens/Log/LoginPage';
import RegisterPage from './Screens/Log/RegisterPage';
import Admin from './Screens/Admin/Admin';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
         <Route path='/login-page' element={<LoginPage></LoginPage>}></Route>
          <Route path='/register-page' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/admin-page' element={<Admin></Admin>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
