import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { GongsiSearch } from "./pages/GongsiSearch/GongsiSearch";

import { Regist } from "./pages/Regist/Regist_01";
import { Regist_02 } from "./pages/Regist/Regist_02";
import { Main } from "./pages/Main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<GongsiSearch />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/regist_02" element={<Regist_02 />} />
      </Routes>
    </Router>
  );
}

export default App;
