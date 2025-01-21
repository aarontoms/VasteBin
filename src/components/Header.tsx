import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Down from "./Down";
import { useUserContext } from "../UserContext";

const url = "https://flexible-ambur-vteam-ea5594a5.koyeb.app";

const Header = () => {

  const { searchTerm } = useParams<{ searchTerm?: string }>();
  const [search, setSearch] = useState(searchTerm || "");
  const { userId, setUserId } = useUserContext();
  const handleNavigate = () => {
    window.location.href = `/user/${search}`;
  }

  const hangleLogOut = async () => {
    const response = await fetch(`${url}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      setUserId("");
      // localStorage.removeItem("isLoggedIn");
    }
    else{
      console.log("Failed to logout")
    }
    window.location.href = `/`;
  }

  return (
    <div>
      <header className="text-white p-4 shadow-md bg-gray-900">
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

          {userId ? (
            <div>
              <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={hangleLogOut}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to={`/login`}>
                <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="ml-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
      <Down search={searchTerm || ""} />
    </div>

  );
};

export default Header;
