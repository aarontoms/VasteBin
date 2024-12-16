import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Create() {
    const { username } = useParams<{ username?: string }>();
    const [isValidUser, setIsValidUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/${username}`)
        .then(async (res) => {
            if (!res.ok) {
                return res.json().then((errorData) => {
                    throw new Error(errorData.error);
                });
            }
            return res.json();
        })
        .then((data) => {
            setIsValidUser(true);
        })
        .catch((err) => setErrorMessage(err.message));

    }, [username]);

    return (
        <div className="text-center text-3xl text-white">
            <div className="px-4">
                    <textarea
                        value={isValidUser? `${username}'s New Vaste`: errorMessage || ""} 
                        readOnly
                        className= {`w-full bg-zinc-700 font-mono p-4 rounded-lg shadow-md outline-none resize-none min-h-[80vh] overflow-y-auto
                            ${errorMessage ? "text-red-500" : "text-gray-300"}`
                        }   
                    />
            </div>
        </div>
    )
}

export default Create;