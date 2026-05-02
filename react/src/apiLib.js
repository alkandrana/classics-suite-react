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

export async function fetchAll(controller) {
    const response = await fetch(`http://localhost:3000/${controller}`);
    const content = await response.json();
    if (!response.ok) {
        console.log(`Error fetching authors`, response.status, content);
    } else {
        return content;
    }
}

export async function fetchOne(controller, id) {
    const response = await fetch(`http://localhost:3000/${controller}/${id}`);
    const content = await response.json();
    if (!response.ok) {
        console.log(`Error fetching ${controller}`, response.status, content);
    } else {
        return content;
    }
}