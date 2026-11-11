import Form from "../../ui/Form.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        // get credentials out of form
        let target = e.target;
        let formData = new FormData(target);
        const loginObj = Object.fromEntries(formData.entries());

        // construct request
        const options = {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        // send request
        const response = await fetch(`http://localhost:5232/login?useCookies=true`, options);
        // let message = await response.json();
        if (response.ok) {
            console.log(response);
            console.log("Logged in successfully.");
            // navigate("/account/profile");
        } else {
            console.log("ERROR: ", response.status, response);
        }
    }

    const loginFields = {
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
    }

    return (
        <Form formData={loginFields} actionRef={handleSubmit} theme="text-amber-500"/>
    )
}
