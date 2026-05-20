import {useNavigate} from "react-router-dom";
import useRefreshToken from "./useRefreshToken.js";

export default function useApi() {
    const navigate = useNavigate();
    const refresh = useRefreshToken();
    const authenticatedFetch = async (url, options = {}) => {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            'authorization': `Bearer ${sessionStorage.getItem("access_token")}`,
        };
        let response = await fetch(url, options);
        if (response.status === 403) {
            try {
                const mayBeAToken = await refresh();
                if (mayBeAToken) {
                    sessionStorage.setItem("access_token", mayBeAToken.access_token);
                    options.headers['authorization'] = `Bearer ${sessionStorage.getItem("access_token")}`;
                    response = await fetch(url, options);
                } else {
                    navigate("/account/login");
                }
            } catch (error) {
                navigate("/account/login");
            }
        }
        return response;
    };

    return authenticatedFetch;
}