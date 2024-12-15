import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Code from "./components/Code";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:searchTerm" element={<Header />} />
        <Route path="" element={<Header />} />
        <Route path="/:username/vastes/:wasteid" element={<Code />} />
        <Route path="/:username/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;