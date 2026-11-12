import { useState, useEffect } from "react";

export default function WorkList() {
    const [works, setWorks] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchRecords = async (recordType) => {
            console.log("Fetching Works:");
            let errors = [];
            let response = await fetch(`http://localhost:5232/${recordType}`);
            console.log('Request sent:', response);
            try {
                let content = await response.json();
                if (response.ok) {
                    setWorks(content);
                } else {
                    errors.push(content)
                }
            } catch (e) {
                errors.push(`Generic Error: ${e.name}: No response body sent.`);
            }

            setErrors(errors);
        }

        fetchRecords("opera");

    }, []);

    return works && (
        <>
            <div className="bg-amber-700">Found {works.length} works.</div>
            {errors.length > 0 && errors.map((e) => (
                <h2 className="bg-red-500 text-lg">{e}</h2>
            ))}
            <div className="grid grid-cols-5 gap-4 font-bold">
                <p className="border">Code</p>
                <p className="border">Title</p>
                <p className="border">Author</p>
                <p className="border">Language</p>
                <p className="border">Actions</p>
            </div>
            {works.map((w) => (
                <div className="grid grid-cols-5 gap-4">
                    <p>{w.code}</p>
                    <p>{w.title}</p>
                    <p>{w.author?.name}</p>
                    <p>{w.language?.name}</p>
                    <div>
                        <a className="text-blue-700 underline p-3" href={`/work/${w.id}`}>
                            View
                        </a>
                        <a className="text-blue-700 underline" href={`/study/${w.id}`}>
                            Study
                        </a>
                    </div>
                </div>
            ))}
        </>
    )
}