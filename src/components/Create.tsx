import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import Cookies from 'js-cookie';

function Create() {
    const { username } = useParams<{ username?: string }>();
    const [isValidUser, setIsValidUser] = useState(false);
    const [wasteid, setWasteid] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [vaste, setVaste] = useState("");

    useEffect(() => {
        const fun = async () => {
            const localid = localStorage.getItem("userId");
            // const sessionCookieValue = Cookies.get('vaste-session');
            // console.log('Session Cookie Value:', sessionCookieValue);

            const response = await fetch(`http://127.0.0.1:5000/validate/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ localid }),
                credentials: "include",
            })
            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
            }
            else {
                setIsValidUser(true);
            }
        }
        if (username) {
            fun();
        }
    }, [username]);

    return (
        <div className="text-3xl text-white">
            <div
                className="p-6 text-gray-200 font-bold text-xl shadow-lg transform transition-transform mb-6 flex items-center justify-between"
                style={{
                    background: "linear-gradient(to right, #6fa3d1, #2ca58d)",
                }}
            >
                <input
                    name="wasteid"
                    id="wasteid"
                    value={wasteid}
                    onChange={(e) => setWasteid(e.target.value)}
                    placeholder="Enter Vaste ID"
                    className="bg-gray-800 p-2 text-gray-300 text-xl font-mono rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-64"
                />
                {isValidUser &&
                    <button
                        className="ml-4 bg-gray-800 hover:bg-gray-900 text-gray-300 px-2 py-2 mx-10 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 text-xl font-semibold">
                        Create Vaste
                    </button>
                }

            </div>
            <div className="px-4">
                <textarea
                    placeholder={!errorMessage && !vaste ? "Enter new Vaste here..." : ""}
                    value={errorMessage ? errorMessage : vaste}
                    onChange={(e) => {
                        if (!errorMessage) setVaste(e.target.value);
                    }}                    
                    readOnly={!!errorMessage}
                    className={`w-full bg-zinc-700 font-mono p-4 rounded-lg shadow-md outline-none resize-none min-h-[80vh] overflow-y-auto
                        ${errorMessage ? "text-red-500" : "text-gray-300"}`}
                />
            </div>
        </div>
    )
}

export default Create;