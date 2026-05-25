import {useNavigate} from "react-router-dom";
import useRefreshToken from "./useRefreshToken.js";

export default function useApi() {
    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const authenticatedFetch = async (url, options = {}) => {
        console.log("Submitted config: ", options);

        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("accessToken")}`,
        };
        console.log("New config: ", options);
        let response = await fetch(url, options);
        if (response.status === 401) {
            console.log("Token expired. Attempting refresh...");
            try {
                const mayBeAToken = await refresh();
                console.log("Might not be a token...", mayBeAToken);
                if (mayBeAToken) {
                    sessionStorage.setItem("accessToken", mayBeAToken.accessToken);
                    options.headers['authorization'] = `Bearer ${sessionStorage.getItem("accessToken")}`;
                    response = await fetch(url, options);
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