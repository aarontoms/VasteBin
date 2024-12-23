import { useState, useEffect } from "react";
import Waste from "./Waste";
import { Link } from "react-router-dom";

function Down({ search }: { search: string }) {
    const [results, setResults] = useState<{ id: string; wastes: { id: string; value: string; created_at: string }[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (search) {
            fetch(`http://127.0.0.1:5000/${search}`)
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
        <div className="m-10">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {results && (
                <div className="flex flex-col">
                    {results.wastes.map((waste) => (
                        <Link to={`${waste.id}`} key={waste.id} className="block">
                            <Waste waste={waste.id} value={waste.value} created_at={waste.created_at} />
                        </Link>
                    ))}
                    <Link to={`create`} className="block">
                        <Waste waste="Create new Waste" value="assmans" created_at="" />
                    </Link>
                </div>
            )}
        </div>
    );

}

export default Down;