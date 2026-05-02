import {useNavigate, Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TextInput from "./TextInput";
import SelectList from "./SelectList.jsx";

export default function Form({instance, values, controller}) {
    const navigate = useNavigate();
    const params = useParams();
    const [metadata, setMetadata] = useState(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            let url = `http://localhost:3000/${controller}/metadata`;
            const response = await fetch(url);
            const content = await response.json();
            if (response.ok) {
                setMetadata(content);
            } else {
                console.log("Error fetching metadata", response.status, content);
            }
        }

        fetchMetadata();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        const record = Object.fromEntries(formData.entries());
        console.log("Constructed object to create: ", record);
        let url, method;
        if (instance) {
            url = `http://localhost:3000/${controller}/${instance.id}`;
            method = "PATCH";
        } else {
            url = `http://localhost:3000/${controller}`;
            method = "POST";
        }
        console.log(url, method);
        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(record),
        });
        const content = await response.json();
        if (response.ok) {
            console.log(content);
            navigate(`/${controller}`);
        } else {
            console.log("Error updating record: ", response.status, content);
        }
    }
    let fields = [];
    if (metadata) {
        console.log("Metadata: ", metadata);
        // console.log("Metadata and: ", instance);
        for (const field of metadata.columns.filter(f => !f.isPrimaryKey)) {
            console.log("In metadata for: ", field.name);
            let value = instance ? instance[field.name] : "";
            if (field.datatype === "string") {
                fields.push(<TextInput key={field.name} metadata={field}
                                       value={value}/>);
            } else if (field.datatype === "enum") {
                console.log("Enum field: ", field);
                fields.push(<SelectList key={field.name} field={field} value={value}/>);
            } else if (field.datatype === "int") {
                console.log("Metadata field: ", field);
                if (field.isForeignKey) {
                    field.valueList = values;
                    fields.push(<SelectList key={field.name} field={field} value={value}/>);
                }
            }

        }
    }
    console.log("Fields to populate: ", fields);

    return (
        <form onSubmit={handleSubmit} className="text-yellow-600">
            {fields.map(f => f)}
            <button type="submit"
                    className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-400 transition">
                Submit
            </button>
            <Link to="/authors"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-400 transition">
                Cancel
            </Link>
        </form>
    )
}