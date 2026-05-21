const URL = "http://localhost:3001";

export async function fetchMetadata(controller) {
    let url = `${URL}/${controller}/metadata`;
    const response = await fetch(url);
    const content = await response.json();
    if (response.ok) {
        return content;
    } else {
        console.log("Error fetching metadata", response.status, content);
    }
}

export async function fetchAll(controller) {
    const response = await fetch(`${URL}/${controller}`);
    const content = await response.json();
    if (!response.ok) {
        console.log(`Error fetching authors`, response.status, content);
    } else {
        return content;
    }
}

export async function fetchOne(controller, id) {
    const response = await fetch(`${URL}/${controller}/${id}`);
    const content = await response.json();
    if (!response.ok) {
        console.log(`Error fetching ${controller}`, response.status, content);
    } else {
        return content;
    }
}