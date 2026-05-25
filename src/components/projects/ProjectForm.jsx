import Form from "../ui/Form.jsx";
import useApi from "../../hooks/useApi.js";
import {useParams, useNavigate} from "react-router-dom";


const url = import.meta.env.VITE_ACCOUNT_URL;
export default function ProjectForm() {
    const authenticatedFetch = useApi();
    const {projectId} = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        let target = e.target;
        const formData = new FormData(target);
        const projectRecord = Object.fromEntries(formData.entries());
        let endpoint = `${url}/projects`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectRecord)
        }
        if (projectId) {
            endpoint += `/${projectId}`;
            options.method = "PATCH";
        }
        const response = await authenticatedFetch(endpoint, options);
        const content = await response.json();
        if (response.ok) {
            navigate('/account/projects');
        } else {
            console.log("ERROR: ", response.status, content);
        }

    }
    const projectFields = {
        label: {label: 'Project Name', type: 'text'},
        description: {label: 'Description', type: 'text'},
        work: {label: 'Work Citation', type: 'text'},
        deadline: {label: 'Deadline', type: 'date'},
    }

    return (
        <Form formData={projectFields} actionRef={handleSubmit}/>
    )
}