import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import url from "./url";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUserId } = useUserContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            username,
            email,
            password,
        };
        const response = await fetch(`${url}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(data.message);
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUserId(data.userid);
                navigate(`/user/${data.username}`);
            }
        } else {
            setMessage(`Error: ${data.error}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-300 mb-6">Create Account</h2>

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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-gray-300"
                            placeholder="Enter your email"
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
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    {message && (
                        <div className={`mt-4 p-4 text-lg rounded-md justify-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </div>
                    )}
                </div>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-400">Already have an account? </span>
                    <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
