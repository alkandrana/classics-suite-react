import Form from "../ui/Form.jsx";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        const objectContents = formData.entries(); // creates an iterator object that acts like a 2-dimensional
        // array of key-value pairs (i.e., [[username: alkandrana], [password: supersecretpassword]]
        const loginObj = Object.fromEntries(objectContents); // reconstructs above 2-dimensional array into an object
        console.log(loginObj);
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            body: JSON.stringify(loginObj),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let message = await response.json();
        console.log("Request data: ", response);
        if (response.ok) {
            console.log(message);
            sessionStorage.setItem("access_token", message.accessToken);
            navigate("/account");
        } else {
            console.log("ERROR: ", response.status, message);
        }
    }

    const loginFields = {
        username: {label: 'Username', type: 'text'},
        password: {label: 'Password', type: 'password'},
    }

    return (
        <Form formData={loginFields} actionRef={handleSubmit} theme="text-amber-500"/>
    )
}