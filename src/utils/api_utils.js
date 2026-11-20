const fetchOne = async (recordId, endpoint) => {
    const request = {
        url: `http://localhost:5232/${endpoint}/${recordId}`,
        options: {
            method: "GET",
            credentials: 'include'
        }
    }
    console.log("Fetching record: ", request.url);
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

const sendRequest = async (request, navigate) => {
    const result = {};
    const response = await fetch(request.url, request.options);
    result.statusCode = response.status;
    try {
        if (response.ok) {
            result.status = "success"
            const content = await response.json();
            result.data = content;
        } else if (response.status == 401) {
            console.log("User not logged in: redirecting to login page.");
            navigate("/account/login");
        }

        else {
            console.log("Request failed: ", response);
            result.status = "error"
            const content = await response.json();
            if (result.errors) {
                result.errors.push(`${response.status}: ${json.stringify(content)}`);
            } else {
                result.errors = [`${response.status}: ${json.stringify(content)}`]
            }
        }
    } catch (err) {
        console.log("Unable to interpret json response: ", response);
        if (result.errors) {
            result.errors.push(`Generic Error: ${response.status}: ${err.name}: No response returned.`);
        } else {
            result.errors = [`Generic Error: ${response.status}: ${err.name}: No response returned.`]
        }
    }
    return result;
}

export { sendRequest, fetchAll, fetchOne };
