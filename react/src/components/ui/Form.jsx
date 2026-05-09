import {Link, useNavigate} from "react-router-dom";

export default function Form({controller, repo, recordId}) {
    const navigate = useNavigate();
    console.log("Form: ", repo);
    const record = repo[controller].find(r => r.id == recordId);
    console.log(`${controller}: `, record);
    const fields = Object.keys(record).filter(key => !key.toLowerCase().includes("id"));
    console.log("Form fields: ", fields);

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        let newRecord = Object.fromEntries(formData.entries());
        let url = `http://localhost:3000/${controller}`;
        let method = 'POST';
        if (recordId) {
            url += `/${recordId}`;
            method = 'PATCH';
        }
        let response = await fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newRecord),
        });
        const content = await response.json();
        if (response.ok) {
            console.log("Record updated successfully: ", content);
            navigate(`/${controller}`);
        } else {
            console.log("There was an error updating the record: ", response.status, content);
        }


    }

    return (

        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="code" className="w-50">Abbreviation</label>
                <input type="text" id="code" name="code"
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title"
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="languageId">Language</label>
                <select id="languageId" name="languageId"
                        className="border border-red-700 rounded">
                    <option value="">select a language</option>
                    {repo.languages.map((language) => (
                        <option key={language.id} value={language.id}>{language.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="authorId">Author</label>
                <select id="authorId" name="authorId"
                        className="border border-red-700 rounded">
                    <option value="">select an Author</option>
                    {repo.authors.map((author) => {
                        return <option key={author.id} value={author.id}>{author.name}</option>
                    })}
                </select>
            </div>
            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">Submit
            </button>
            <Link to='/works'
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </Link>
        </form>
    )
}