import Form from "../ui/Form.jsx";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        const user = Object.fromEntries(formData.entries());
        if (user.password !== user.confirmPwd) {
            console.log("Error: Password and Confirm Password fields must match");
            return;
        }
        console.log("User data to submit: ", user);
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            body: JSON.stringify({email: user.email, password: user.password}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        let message = await response.json();
        if (response.ok) {
            navigate('/account/login');
        }
        console.log("Submission result: ", response);
        console.log(message);
    }

    const userFields = {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
        confirmPwd: {label: "Confirm Password", type: "password"},
    }

    return (
        <Form formData={userFields} actionRef={handleSubmit} theme="text-green-700 bg-gray-900 border-green-500"/>
    )
}