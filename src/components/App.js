import React from "react";
import MainPage from "./MainPage";
import DetailPage from "./DetailPage";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Github user list exercise</h1>
      <div className="container">
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="detail/:userName" element={<DetailPage />}></Route>
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
