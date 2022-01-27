import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthRoute from "./AuthRoute";
import Initial from "./pages/Initial";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Initial />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthRoute />} >
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
