const url = import.meta.env.VITE_ACCOUNT_URL;

export default function useRefreshToken() {
    const refresh = async () => {
        const response = await fetch(`${url}/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken: sessionStorage.getItem("refreshToken")}),
        });
        let content = await response.json();
        if (response.ok) {
            let token = content.accessToken;
            sessionStorage.setItem("access_token", token);
            return content;
        }
    }
    return refresh;
}