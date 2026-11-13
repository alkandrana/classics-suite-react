import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getFormData, buildSubmitRequest } from "../utils/form_utils";
import { sendRequest } from "../utils/api_utils";
import SimpleInput from "./form/SimpleInput";

export default function AddAuthor() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleAddAuthor = async (e) => {
        const data = getFormData(e);
        const request = buildSubmitRequest(data, "authors");
        const result = await sendRequest(request);
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
