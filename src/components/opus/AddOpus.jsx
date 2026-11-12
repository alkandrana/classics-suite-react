import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleInput from "../form/SimpleInput";
import Select from "../form/Select";

export default function AddOpus() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const getFormData = (e) => {
        e.preventDefault();
        let target = e.currentTarget;
        const formData = new FormData(target);
        const data = Object.fromEntries(formData.entries());
        e.currentTarget.reset();
        console.log("Data retrieved from form: ", data);
        return data;
    }

    const buildRequest = (data, endpoint) => {
        return {
            url: `http://localhost:5232/${endpoint}`,
            options: {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            }
        }
    }

    const sendRequest = async (request) => {
        const result = {};
        const response = await fetch(request.url, request.options);
        try {
            if (response.ok) {
                result.status = "success"
                const content = await response.json();
                result.data = content;
            } else {
                result.status = "error"
                const content = await response.json();
                result.errors.push(content)
            }
        } catch (err) {
            result.errors.push(`Generic Error: ${e.name}: No response returned.`);
        }
        return result;
    }

    const handleAddOpus = async (e) => {
        const data = getFormData(e);
        const request = buildRequest(data, "opera");
        const result = await sendRequest(request);
        if (result.status == "success") {
            setSuccess("Work created successfully");
            console.log(result.data);
            navigate("/")
        } else {
            setErrors(result.errors);
        }
    }

    const fetchAll = async (endpoint, setter) => {
        const request = {
            url: `http://localhost:5232/${endpoint}`,
            options: {
                method: "GET"
            }
        }
        const result = await sendRequest(request);
        if (result.status == "success") {
            setter(result.data);
        } else {
            setErrors(result.errors);
        }
    }

    useEffect(() => {
        fetchAll("authors", setAuthors);
        fetchAll("languages", setLanguages);
    }, []);


    return (
        <>
            {errors.length > 0 && errors.map((err) => (<div className="text-red-500">{err}</div>))}
            <div className="text-green-500">{success && success}</div>

            <form onSubmit={handleAddOpus}>
                <SimpleInput label="Abbreviation" name="code" datatype="text" />
                <SimpleInput label="Title" name="title" datatype="text" />
                <Select records={languages} label="Language" name="languageId" />
                <Select records={authors} label="Author" name="authorId" />
                <button type="submit" className="bg-green-800 cursor-pointer p-3 rounded">Add Work</button>
            </form>
        </>
    )
}
