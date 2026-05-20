import {useEffect, useState} from "react";
import useAuthenticatedFetch from '../../hooks/useApi.js';

export default function Account() {
    const [profile, setProfile] = useState(null);
    const authenticatedFetch = useAuthenticatedFetch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authenticatedFetch("http://localhost:3000/users/profile", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
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

    return profile && (
        <ul>
            <li>User Name: {profile.username}</li>
            <li>Email Address: {profile.email}</li>
            <li>Member Since: {profile.createdAt}</li>
        </ul>
    )
}