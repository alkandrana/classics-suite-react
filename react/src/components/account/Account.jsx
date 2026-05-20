import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Account() {
    const [profile, setProfile] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem("access_token"));

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/profile", {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    }
                });
                if (response.status === 403) {
                    console.log("Token expired");
                    const response = await fetch("http://localhost:3000/auth/refresh", {
                        method: "GET",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
                    let message = await response.json();
                    if (response.ok) {
                        let token = message.accessToken;
                        sessionStorage.setItem("access_token", token)
                        setToken(token);
                    }
                    console.log("Refreshing token: ", response, message);
                }
                if (response.ok) {
                    let content = await response.json();
                    setProfile(content);
                    console.log(content);
                }
            } catch (error) {
                console.log("Catching error: ", error);
                if (error.response?.status === 403) {
                    console.log(error.response);
                } else {
                    console.log("ERROR: ", error.response.status);
                }
            }

        }
        fetchProfile();
    }, [token]);

    return profile && (
        <ul>
            <li>User Name: {profile.username}</li>
            <li>Email Address: {profile.email}</li>
            <li>Member Since: {profile.createdAt}</li>
        </ul>
    )
}