import Form from "../ui/Form.jsx";
import {useNavigate} from "react-router-dom";

const loginUrl = import.meta.env.VITE_ACCOUNT_URL;
export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        const objectContents = formData.entries(); // creates an iterator object that acts like a 2-dimensional
        // array of key-value pairs (i.e., [[username: alkandrana], [password: supersecretpassword]]
        const loginObj = Object.fromEntries(objectContents); // reconstructs above 2-dimensional array into an object
        const options = {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log("Ready to login with credentials: ", options);
        console.log("Endpoint: ", loginUrl);
        const response = await fetch(`${loginUrl}/login`, options);
        let message = await response.json();
        console.log("Request data: ", response);
        if (response.ok) {
            console.log(message);
            sessionStorage.setItem("accessToken", message.accessToken);
            sessionStorage.setItem("refreshToken", message.refreshToken);
            navigate("/account");
        } else {
            console.log("ERROR: ", response.status, message);
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