import { useState } from "react"
import { useNavigate } from "react-router-dom";
import SimpleInput from "./form/SimpleInput";
import authorProps from "../models/Author";

export default function AddAuthor() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
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

    const handleSubmit = async (request) => {
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

    const handleAddAuthor = async (e) => {
        const data = getFormData(e);
        const request = buildRequest(data, "authors");
        const result = await handleSubmit(request);
        if (result.status == "success") {
            setSuccess("Author created successfully");
            console.log(result.data);
            navigate("/");
        } else {
            setErrors(result.errors);
        }
    }



    return (
        <>
            {errors.length > 0 && errors.map((err) => (<div className="text-red-500">{err}</div>))}
            <div className="text-green-500">{success && success}</div>

            <form onSubmit={handleAddAuthor}>
                <SimpleInput label={"Abbreviation"} name={"code"} datatype={"text"} />
                <SimpleInput label={"Common Name"} name="name" datatype={"text"} />
                <SimpleInput label={"First Name"} name="praenomen" datatype={"text"} />
                <SimpleInput label={"Last Name"} name="nomen" datatype={"text"} />
                <SimpleInput label={"Nickname"} name="cognomen" datatype={"text"} />
                <button className="bg-blue-50 cursor-pointer">Add Author</button>
            </form>
        </>
    )
}
