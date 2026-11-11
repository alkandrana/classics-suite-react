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
            <div>Found {works.length} works.</div>
            {errors.length > 0 && errors.map((e) => (
                <h2 className="bg-red-500 text-lg">{e}</h2>
            ))}
        </>
    )
}