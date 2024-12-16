import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import Header from "./components/Header";
import Code from "./components/Code";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Create from "./components/Create";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/user/:searchTerm" element={<Header />} />
          <Route path="/" element={<Header />} />
          <Route path="/user" element={<Header />} />
          <Route path="/user/:username/:wasteid" element={<Code />} />
          <Route path="/user/:username/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div className="p-10 text-white text-center text-4xl">404 Not Found</div>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;