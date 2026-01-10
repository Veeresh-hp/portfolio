import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SmoothCursor from "./components/ui/SmoothCursor";
import HomePage from "./components/HomePage";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <div className="App">
      <SmoothCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;