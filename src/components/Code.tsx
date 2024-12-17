import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Code() {
    const { username, wasteid } = useParams<{ username?: string; wasteid?: string }>();
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    console.log(username, wasteid);
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
                data = data.wastes.filter((waste: { id: string; value: string }) => waste.id === wasteid);
                if (data.length === 0) {
                    throw new Error("Vaste not found");
                }
                setCode(data[0].value);
                console.log("Processed Data:", data[0].value);
            })
            .catch((err) => setError(err.message));
    }, [username, wasteid]);

    return (
        <div>
            <div
                className="p-5 text-gray-200 font-bold text-xl shadow-lg transform transition-transform mb-6"
                style={{
                    background: "linear-gradient(to right, #6fa3d1, #2ca58d)",
                }}
            >
                <h1 className="text-4xl font-medium mt-2">{username}'s Paste: {wasteid}</h1>
            </div>
            <div className="px-4">
                <div
                    // value={code || error || ""}
                    // readOnly
                    className={`w-full bg-zinc-700 font-mono p-4 rounded-lg shadow-md outline-none resize-none min-h-[100vh] overflow-y-auto
                            ${error ? "text-red-500" : "text-gray-300"}`}
                    style = {{whiteSpace: "pre-wrap", wordBreak: "break-word"}
                    }
                >
                    {code || error || ""}
                </div>
            </div>
        </div>
    );
}

export default Code;