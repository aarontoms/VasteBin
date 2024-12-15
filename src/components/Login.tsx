import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/dashboard");
    } else {
      setMessage(`${data.error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-300 mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-gray-300"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-gray-200 font-semibold rounded-md focus:outline-none hover:bg-blue-700 transition duration-200">
              Log In
            </button>
          </div>
        </form>
        <div className="mt-4 semibold text-l text-red-500 text-center">
          {message}
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Don't have an account? </span>
          <a href="/signup" className="text-blue-500 hover:underline">Sign Up here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;