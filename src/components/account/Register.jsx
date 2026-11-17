import Auth from "../form/Auth"
import { getFormData, buildSubmitRequest } from "../../utils/form_utils";
import { sendRequest } from "../../utils/api_utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Register(){
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        const data = getFormData(e);
        const request = buildSubmitRequest(data, "register");
        const result = await sendRequest(request);
        if (result.status == "success") {
            navigate('/account/login');
        } else {
            setErrors(result.errors);
    }
}

    return errors.length > 0 ? (
        <div className="text-red-500">{errors.map((error, i) => <p key={i}>{error}</p>)}</div>
    ) : (
        <Auth handleSubmitForm={handleSubmit}/>
    )
}
