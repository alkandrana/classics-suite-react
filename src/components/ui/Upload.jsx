import useApi from "../../hooks/useApi.js";

export default function Upload() {
    const authenticatedFetch = useApi();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let target = e.target;
        const formData = new FormData(target);
        const response = await fetch('http://localhost:3000/files', {
            method: 'POST',
            body: formData
        });
        const content = await response.json();
        if (response.ok) {
            console.log(content);
        } else {
            console.log("ERROR: ", response.status, content);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="file">File Upload</label>
            <input type="file" id="file" name="file" className="file-input file-input-primary"/>
            <button type="submit" className="btn btn-secondary">Upload</button>
        </form>
    )
}