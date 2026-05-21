import {useState} from "react";
import {Link, useOutletContext} from "react-router-dom";

export default function Opera() {

    const repo = useOutletContext();
    const [opera, setOpera] = useState(repo.opera);
    const [title, setTitle] = useState("");
    console.log("Search key: ", title);
    console.log("Rerendering works: ", opera);
    console.log("New search: ", opera.filter(op => op.title.startsWith(title)));


    function searchFilter(e) {
        e.preventDefault();
        let target = e.target;
        const formData = new FormData(target);
        const searchObj = Object.fromEntries(formData.entries());
        if (searchObj.language) {
            setOpera((opera) => opera.filter(op => op.languageId == searchObj.language));
        }
        if (searchObj.author) {
            setOpera((opera) => opera.filter(op => op.authorId == searchObj.author));
        }
    }

    function searchByTitle(e) {
        let keyword = e.target.value;
        if (keyword === "") {
            setOpera(repo.opera);
        } else {
            let results = opera.filter(op => op.title.toLowerCase().startsWith(keyword.toLowerCase())); // careful not to use state variable before rerender!
            setOpera(results);
        }
        setTitle(keyword);
    }

    function resetFilter() {
        setOpera(() => repo.opera);
        document.getElementById("author").value = "";
        document.getElementById("language").value = "";
    }

    function submitKeyword() {

    }

    return opera.length > 0 ? (
        <>
            <div className="flex gap-4">
                <form id="filter" onSubmit={searchFilter} className="flex gap-4">
                    <div className="form-group">
                        <label htmlFor="author" className="font-bold">Author</label>
                        <select name="author" id="author" className="border border-gray-700">
                            <option value="">Select an author</option>
                            {repo.authors.map(author =>
                                <option key={author.id} value={author.id}>{author.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="language" className="font-bold">Languages</label>
                        <select name="language" id="language" className="border border-gray-700">
                            <option value="">Select a language</option>
                            {repo.languages.map(lang =>
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-sm bg-gray-700">Search</button>
                    <button type="button" className="btn bg-gray-700 btn-sm mr-4" onClick={resetFilter}>Clear</button>
                </form>
                <form id="live-search" onSubmit={submitKeyword}>
                    <label htmlFor="title">Search by title: </label>
                    <input type="text" id="title" name="title" onChange={searchByTitle} value={title} autoFocus/>
                    {/*<button type="submit" className="btn bg-gray-700 btn-sm mr-4">Search</button>*/}
                </form>
            </div>
            <h1>Works</h1>
            <Link to={`/works/add`}
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition flex ml-auto w-25">
                Add New
            </Link>
            <div id="header" className="flex flex-row bg-black mt-5">
                <div className="w-1/5">Abbreviation</div>
                <div className="w-1/5">Title</div>
                <div className="w-1/5">Language</div>
                <div className="w-1/5">Author</div>
                <div className="w-1/5">Lines</div>
                <div className="w-1/5">Actions</div>
            </div>
            {opera.map((opus) => {
                return (
                    <div key={opus.id}
                         className="flex flex-row py-3 bg-gray-700">
                        <div className="w-1/6">{opus.code}</div>
                        <div className="w-1/6">{opus.title}</div>
                        <div className="w-1/6">{opus.language?.name || ""}</div>
                        <div className="w-1/6">{opus.author.name}</div>
                        <div className="w-1/6">{opus.lineCount}</div>
                        <div className="w-1/6">
                            <Link to={`/works/${opus.id}/edit`} className="text-blue-600 underline m-1">
                                Edit
                            </Link>
                            <Link to={`/works/${opus.id}`} className="text-blue-600 underline">
                                View
                            </Link>
                        </div>
                    </div>
                )
            })}
        </>
    ) : (
        <>
            <form id="live-search" onSubmit={submitKeyword}>
                <label htmlFor="title">Search by title: </label>
                <input type="text" id="title" name="title" onChange={searchByTitle} value={title} autoFocus/>
                {/*<button type="submit" className="btn bg-gray-700 btn-sm mr-4">Search</button>*/}
            </form>
            <div className="text-xl text-red-600 font-bold mb-10">No Records Found</div>
            <Link to="/works/add"
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition">
                Add New
            </Link>
        </>
    )
}