import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "https://flexible-ambur-vteam-ea5594a5.koyeb.app";

function Code() {
    const navigate = useNavigate();
    const { username, wasteid } = useParams<{ username?: string; wasteid?: string }>();
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isValidUser, setIsValidUser] = useState(false);

    console.log(username, wasteid);
    useEffect(() => {
        fetch(`${url}/${username}`)
            .then(async (res) => {
                if (!res.ok) {
                    return res.json().then((errorData) => {
                        throw new Error(errorData.error);
                    });
                }
                return res.json();
            })
            .then((data) => {
                data = data.wastes.filter((waste: { id: string; value: string }) => waste.id === wasteid);
                if (data.length === 0) {
                    throw new Error("Vaste not found");
                }
                setCode(data[0].value);
            })
            .catch((err) => setError(err.message));
    }, [username, wasteid]);

    useEffect(() => {
        const fun = async () => {
            const localid = localStorage.getItem("userId");

            const response = await fetch(`${url}/validate/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ localid }),
                credentials: "include",
            })
            if (!response.ok) {
                setIsValidUser(false);
            }
            else {
                setIsValidUser(true);
            }
        }
        if (username) {
            fun()
        }
    }, [username]);

    const deleteButton = async () => {
        const response = await fetch(`${url}/delete/${username}/${wasteid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ localid: localStorage.getItem("userId") }),
            credentials: "include",
        });

        if (response.ok) {
            navigate(`/user/${username}`);
        }
        else {
            const errorData = await response.json();
            console.log(errorData.error);
        }
    }

    return (
        <div>
            <div
                className="p-5 text-gray-200 font-bold text-xl shadow-lg transform transition-transform mb-6 display flex justify-between"
                style={{
                    background: "linear-gradient(to right, #6fa3d1, #2ca58d)",
                }}
            >
                <h1 className="text-4xl font-medium">{username}'s Paste: {wasteid}</h1>
                {isValidUser && <button
                    onClick={deleteButton}
                    className="ml-4 border border-transparent bg-gray-800 hover:bg-gray-900 hover:border-red-400 text-red-400 px-2 py-2 mx-10 rounded-md shadow-md text-xl font-semibold">
                    Delete Vaste
                </button>
                }
            </div>
            <div className="px-4">
                <div
                    className={`w-full bg-zinc-700 font-mono p-4 text-lg rounded-lg shadow-md outline-none resize-none min-h-[100vh] overflow-y-auto
                            ${error ? "text-red-500" : "text-gray-300"}`}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }
                    }
                >
                    {code || error || ""}
                </div>
            </div>
        </div>
    );
}

export default Code;
