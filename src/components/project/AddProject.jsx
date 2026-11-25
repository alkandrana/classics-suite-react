import { getFormData, buildSubmitRequest } from '../../utils/form_utils';
import { sendRequest } from '../../utils/api_utils.js';
import SimpleInput from '../form/SimpleInput.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
export default function AddProject() {

    const { workId } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const handleAddProject = (e) => {
        const data = getFormData(e);
        data.opusId = workId;
        const request = buildSubmitRequest(data, "projects");
        const result = sendRequest(request);
        if (result.status == "success" || result.statusCode == 409) {
            navigate(`/study/${workId}`);
        } else if (result.statusCode == 401) {
            console.log("User not logged in: redirecting to login page...");
            navigate('/acount/login');
        } else {
            console.log("An error occurred attempting to save the project: ", result);
            setErrors(result.errors);
        }
    }

    return (
        <>
            <div className='text-red-600' >
                {errors && Object.keys(errors).map((cat) => (
                    <>
                        <div className='text-lg font-bold'>{cat}</div>
                        <p>{errors[cat]}</p>
                    </>
                ))}</div>
            <form onSubmit={handleAddProject}>
                <SimpleInput name={"label"} label={"Project Title"} datatype={"text"} />
                <SimpleInput name={"description"} label={"Description (optional)"} datatype={"text"} />
                <SimpleInput name={"deadline"} label="Deadline (optional)" datatype={"date"} />
                <button type="submit" className='bg-green-600 p-3 rounded'>Add Project</button>
            </form>
        </>
    )
}
