import { useState, useEffect } from "react";
import Waste from "./Waste";
import { Link } from "react-router-dom";

function Down({ search }: { search: string }) {
    const [results, setResults] = useState<{ id: string; value: string }[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (search) {
            fetch(`http://127.0.0.1:5000/${search}`)
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((errorData) => {
                            throw new Error(errorData.error);
                        });
                    }
                    return res.json();
                })
                .then((data) => {
                    setResults(data)
                    console.log("Processed Data:", results);
                })
                .catch((err) => setError(err.message));
        }
    }, [search]);

    return (
        <div className="m-10">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {results && (
                <div className="flex flex-wrap justify-start">
                    {results.map((waste) => (
                        <Link to={`vastes/${waste.id}`} key={waste.id} className="block">
                            <Waste waste={waste.id} value={waste.value} />
                        </Link>
                    ))}
                    <Link to={"login"}>
                        <Waste waste="Create new Waste" value="assmans"/>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Down;