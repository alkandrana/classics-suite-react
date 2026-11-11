import {useNavigate} from "react-router-dom";
import useRefreshToken from "./useRefreshToken.js";
import { useState } from "react";

export default function useApi() {
    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const [accessToken, setAccessToken] = useState("");

    const authenticatedFetch = async function (url, options = {}) {
        console.log("Submitted config: ", options);

        // 1. Add authentication to the request headers
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        };

        // 2. Send request
        let response = await fetch(url, options);

        // 3. If authentication failed...
        if (response.status === 401) {
            console.log("Token expired. Attempting refresh...");

            // 3.a Send request to refresh endpoint
            try {
                const mayBeAToken = await refresh();

                // 3.b If refresh succeeded, update the token, update request headers, and resend request
                if (mayBeAToken) {
                    setAccessToken(mayBeAToken.accessToken);
                    options.headers['Authorization'] = `Bearer ${accessToken}`;
                    response = await fetch(url, options);

                // 3.b Otherwise, redirect to login
                } else {
                    console.log("No credentials found. Redirecting to login...");
                    navigate("/account/login");
                }
            } catch (error) {
                console.log("Refresh failed: ", error);
                console.log("Redirecting to login...");
                navigate("/account/login");
            }
        }
        return response;
    };

    return authenticatedFetch;
}