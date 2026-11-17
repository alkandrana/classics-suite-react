import { useNavigate } from "react-router-dom";
import { getFormData, buildSubmitRequest } from "../../utils/form_utils";
import { sendRequest } from "../../utils/api_utils";
import { useState } from "react";
import Auth from "../form/Auth";

export default function Login(){
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleSubmitForm = async(e) => {
        const data = getFormData(e);
        console.log(data)
        const request = buildSubmitRequest(data, "login?useCookies=true");
        console.log(request);
        const result = await sendRequest(request);
        console.log(result);
        if (result.status == "success"){
            navigate('/');
        } else {
            setErrors(result.errors)
        }
    }

    return (
        <>
        <div className="text-red-500">
            {errors.length > 0 && errors.map((err, i) =>
                <p key={i}>{err}</p>
            )}
        </div>
        <Auth handleSubmitForm={handleSubmitForm}/>
        </>
    )
}
