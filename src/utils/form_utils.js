const getFormData = (e) => {
    e.preventDefault();
    let target = e.currentTarget;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    e.currentTarget.reset();
    console.log("Data retrieved from form: ", data);
    return data;
}

const buildSubmitRequest = (data, endpoint) => {
    return {
        url: `http://localhost:5232/${endpoint}`,
        options: {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }
    }
}

export { getFormData, buildSubmitRequest };