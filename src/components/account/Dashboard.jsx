import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAll } from '../../utils/api_utils.js';
export default function Dashboard() {
    const [profile, setProfile] = useState(null);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAll("profile").then((result) => {
            if (result.status == "success"){
                setProfile(result.data);
            } else if (result.statusCode == 401){
                navigate("/account/login");
            } else {
                setErrors(result.errors);
            }
        });
    }, []);

    return(
        <>
            {errors.length > 0 && (
                <div className="text-red-600">
                    {errors.map((error) => (
                        <p>{error}</p>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-3">
                <a href="/account/projects"><div>Projects</div></a>
                <a href="/account/comments"><div>Comments</div></a>
                <a href="/account/vocab"><div>Vocab</div></a>
            </div>
        </>
    )
}
