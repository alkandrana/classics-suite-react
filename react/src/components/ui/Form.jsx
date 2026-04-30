import {useNavigate, Link, useParams, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import TextInput from "./TextInput";

export default function Form() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [instance, setInstance] = useState();
    const [metadata, setMetadata] = useState(null);
    let controller = location.pathname.split("/").filter(p => p)[0];
    let recordType = controller.slice(0, -1);

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

        const fetchRecord = async () => {
            let url = `http://localhost:3000/${controller}/${params[recordType + "Id"]}`;
            console.log(url);
            const response = await fetch(url);
            const content = await response.json();
            if (response.ok) {
                setInstance(content);
                console.log(content);
            } else {
                console.log("Error fetching record", response.status, content);
            }
        }
        if (params[recordType + "Id"]) {
            fetchRecord();
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
            navigate(`/${recordType}s`);
        } else {
            console.log("Error updating record: ", response.status, content);
        }
    }
    let fields = [];
    if (metadata) {
        console.log("Metadata: ", metadata);
        console.log("Metadata and: ", instance);
        for (const field of metadata.filter(f => !f.isPrimaryKey)) {
            if (field.datatype === "string") {
                fields.push(<TextInput key={field.name} metadata={field}
                                       value={instance ? instance[field.name] : ""}/>);
            }
        }
    }

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