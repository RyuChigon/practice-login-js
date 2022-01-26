import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Initial from "./pages/Initial";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Initial />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
