import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Down from "./Down";

const Header = () => {

  const { searchTerm } = useParams<{ searchTerm?: string }>();
  const [search, setSearch] = useState(searchTerm || "");
  const handleNavigate = () => {
    window.location.href = `/${search}`;
  }

  return (
    <div>
      <header
        style={{ backgroundColor: "#1e1e2e" }}
        className="text-white p-4 shadow-md"
      >
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">VasteBin{searchTerm ? `/${searchTerm}` : ''}</h1>
          <nav className="flex-1 flex justify-center space-x-5">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
              className="text-gray-600 border border-gray-300 rounded-md px-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 "
            />
            <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleNavigate}>
              Submit
            </button>

          </nav>
          {searchTerm ? (
            <Link to={`login`}>
              <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Login
              </button>
            </Link>
          ) : (
            <Link to="signup">
              <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </header>
      <Down search={searchTerm || ""} />
    </div>

  );
};

export default Header;
