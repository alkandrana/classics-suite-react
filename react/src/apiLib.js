export async function fetchMetadata(controller) {
    let url = `http://localhost:3000/${controller}/metadata`;
    const response = await fetch(url);
    const content = await response.json();
    if (response.ok) {
        return content;
    } else {
        console.log("Error fetching metadata", response.status, content);
    }
}