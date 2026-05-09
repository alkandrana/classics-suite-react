export async function fetchAll(controller) {
    const response = await fetch(`http://localhost:3000/${controller}`);
    const content = await response.json();
    if (response.ok) {
        return content;
    } else {
        console.log("Error fetching data: ", response.status, content);
    }
}

export async function fetchOne(controller, id) {
    const response = await fetch(`http://localhost:3000/${controller}/${id}`);
    const content = await response.json();
    if (response.ok) {
        return content;
    } else {
        console.log("Error fetching record: ", response.status, content);
    }
}

export async function submitForm(e, controller) {
    // e.preventDefault();
    let target = e.target;
    let formData = new FormData(target);
    const record = Object.fromEntries(formData.entries());
    let url = `http://localhost:3000/${controller}`
    let method = "POST";
    if (record.id) {
        method = "PATCH";
        url += `/${record.id}`;
    } else {
        delete record.id;
    }
    console.log(`Submitting ${method} request to ${url}: `, record);
    const response = await fetch(url, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(record)
    });
    const content = await response.json();
    if (response.ok) {
        console.log("Operation completed successfully,", content);
    } else {
        console.log("An error occurred: ", response.status, content);
    }
}