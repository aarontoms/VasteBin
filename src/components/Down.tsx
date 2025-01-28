import { useState, useEffect } from "react";
import Waste from "./Waste";
import { Link } from "react-router-dom";
import url from "./url";
import github from "../assets/github.png";

function Down({ search }: { search: string }) {
    const [results, setResults] = useState<{ id: string; wastes: { id: string; value: string; created_at: string }[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (search) {
            fetch(`${url}/${search}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const errorData = await res.json();
                        throw new Error(errorData.error);
                    }
                    return res.json();
                })
                .then((data) => {
                    setResults(data)
                    console.log("Processed Data:", results);
                    console.log("Data:", data);
                })
                .catch((err) => setError(err.message));
        }
    }, [search]);

    return (
        <div>
            {!search ? (
                <div className="flex flex-col justify-end">
                    <div className="m-10 text-center justify-center">
                        <a
                            href="https://github.com/aarontoms/VasteBin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 text-l no-underline hover:no-underline flex items-center justify-end gap-5"
                        >
                        <p>For documentation visit GitHub</p>
                        <img src={github} alt="github" className="max-w-[30px] max-h-[30px] object-contain"/>
                        </a>
                    </div>
                </div>
            ) : (
                <div className="m-10">
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {results && (
                        <div className="flex flex-col">
                            {results.wastes.map((waste) => {
                                const gmtDate = new Date(waste.created_at);
                                const options = { timeZone: "Asia/Kolkata", hour12: true };
                                const istDate = gmtDate.toLocaleString("en-GB", options);

                                return (
                                    <div className="flex justify-between items-center" key={waste.id}>
                                        <Link to={`${waste.id}`} className="block">
                                            <Waste waste={waste.id} value={waste.value} created_at={istDate} />
                                        </Link>
                                    </div>
                                );
                            })}

                            <Link to={`create`} className="block">
                                <Waste waste="Create new Waste" value="assmans" created_at="" />
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default Down;
