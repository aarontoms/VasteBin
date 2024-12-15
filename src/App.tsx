import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Code from "./components/Code";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:searchTerm" element={<Header />} />
        <Route path="" element={<Header />} />
        <Route path="/:username/vastes/:wasteid" element={<Code />} />
        <Route path="/:username/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;