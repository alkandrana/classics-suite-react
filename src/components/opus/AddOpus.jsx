import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest, fetchAll } from "../../utils/api_utils";
import { getFormData, buildSubmitRequest } from "../../utils/form_utils";
import SimpleInput from "../form/SimpleInput";
import Select from "../form/Select";

export default function AddOpus() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();

    const handleAddOpus = async (e) => {
        const data = getFormData(e);
        const request = buildSubmitRequest(data, "opera");
        const result = await sendRequest(request);
        if (result.status == "success") {
            setSuccess("Work created successfully");
            console.log(result.data);
            navigate("/")
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

