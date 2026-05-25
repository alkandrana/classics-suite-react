import {useEffect, useState} from "react";
import useAuthenticatedFetch from '../../hooks/useApi.js';
import Menu from "../ui/Menu.jsx";

const url = import.meta.env.VITE_ACCOUNT_URL;

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const authenticatedFetch = useAuthenticatedFetch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authenticatedFetch(`${url}/profile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${sessionStorage.getItem("accessToken")}`,
                    }
                });
                if (response.ok) {
                    let content = await response.json();
                    setProfile(content);
                    console.log(content);
                }
            } catch (error) {
                console.log("Catching error: ", error);
                console.log("ERROR: ", error.response.status);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="flex w-full">
            <Menu/>
            {
                profile ? (
                    <ul className="w-full pl-3">
                        <li>User Name: {profile.userName}</li>
                        <li>Email Address: {profile.email}</li>
                        <li>Phone: {profile.phoneNumber}</li>
                    </ul>
                ) : <div className="w-full pl-3">Loading your data...</div>
            }


        </div>
    )
}