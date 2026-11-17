const fetchOne = async (recordId, endpoint) => {
    const request = {
        url: `http://localhost:5232/${endpoint}/${recordId}`,
        options: {
            method: "GET",
            credentials: 'include'
        }
    }
    const result = await sendRequest(request);
    return result;
}

const fetchAll = async (endpoint) => {
    const request = {
        url: `http://localhost:5232/${endpoint}`,
        options: {
            method: "GET",
            credentials: 'include'
        }
    }
    const result = await sendRequest(request);
    return result;
}

const sendRequest = async (request) => {
    const result = {};
    const response = await fetch(request.url, request.options);
    try {
        if (response.ok) {
            result.status = "success"
            const content = await response.json();
            result.data = content;
        } else {
            result.status = "error"
            const content = await response.json();
            if (result.errors) {
                result.errors.push(`${response.status}: ${content}`);
            } else {
                result.errors = [`${response.status}: ${content}`]
            }
        }
    } catch (err) {
        if (result.errors) {
            result.errors.push(`Generic Error: ${response.status}: ${err.name}: No response returned.`);
        } else {
            result.errors = [`Generic Error: ${response.status}: ${err.name}: No response returned.`]
        }
    }
    return result;
}

export { sendRequest, fetchAll, fetchOne };
