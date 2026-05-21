export default function useRefreshToken() {

    const refresh = async () => {
        const response = await fetch("http://localhost:3000/auth/refresh", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
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