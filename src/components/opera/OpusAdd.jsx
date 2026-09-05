import {Link, useNavigate, useParams, useOutletContext} from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;
export default function OpusAdd() {
    const {opusId} = useParams();
    console.log("ID: ", opusId);
    const repo = useOutletContext();
    const opus = repo.opera.find(o => o.id == opusId);
    console.log(repo.languages);

    const navigate = useNavigate();
    console.log("Getting data from Fetch Opus: ", opus);

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        let newOpus = Object.fromEntries(formData.entries());
        console.log("Getting data out of form: ", newOpus);
        let url = `${BASE_URL}/opera`;
        let method = 'POST';
        if (opusId) {
            url += `/${opusId}`;
            method = 'PATCH';
        }
        let response = await fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOpus),
        });
        const content = await response.json();
        if (response.ok) {
            console.log("Work updated successfully: ", content);
            navigate('/works');
        } else {
            console.log("There was an error updating the work: ", response.status, content);
        }


    }

    return repo.authors.length > 0 ? (

        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="code" className="w-50">Abbreviation</label>
                <input type="text" id="code" name="code" defaultValue={opus?.code || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" defaultValue={opus?.title || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="languageId">Language</label>
                <select id="languageId" name="languageId" defaultValue={opus?.languageId || ""}
                        className="border border-red-700 rounded">
                    <option value="">select a language</option>
                    {repo.languages.map((language) => (
                        <option key={language.id} value={language.id}>{language.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-row gap-4 my-3">
                <label htmlFor="authorId" className="w-60">Author</label>
                <select id="authorId" name="authorId" defaultValue={opus?.authorId || ""}
                        className="border border-red-700 rounded">
                    <option value="">select an Author</option>
                    {repo.authors.map((author) => {
                        return <option key={author.id} value={author.id}>{author.name}</option>
                    })}
                </select>
                <a href="/authors/add" className="text-blue-600 underline text-xs">Add new author</a>
            </div>
            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">Submit
            </button>
            <Link to='/works'
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </Link>
        </form>
    ) : (
        <div>
            No Authors exist yet. <a href="/authors/add" className="text-blue-600 underline">Create One</a>
        </div>
    )
}