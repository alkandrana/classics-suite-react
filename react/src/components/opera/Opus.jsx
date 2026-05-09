import {useOutletContext, useParams} from "react-router-dom";
import {submitForm} from "../../utils/api.js";

export default function Opus() {
    const repo = useOutletContext();
    const {opusId} = useParams();
    console.log("ID: ", opusId);
    const opus = repo.opera.find(op => op.id == opusId);
    console.log("Fetched data: ", repo);

    opus.author = repo.authors.find(a => a.id === opus.authorId);
    opus.language = repo.languages.find(l => l.id === opus.languageId);
    opus.lines = repo.lines.filter(l => l.opusId == opus.id);

    console.log("Current record: ", opus);

    async function handleSubmit(e) {
        submitForm(e, "lines");
    }

    function handleEdit(id) {
        const line = repo.lines.find(l => l.id == id);
        document.getElementById("number").defaultValue = line.number;
        document.getElementById("text").defaultValue = line.text;
        document.getElementById("locus").defaultValue = line.locus;
        document.getElementById("id").defaultValue = line.id;
        // console.log($form.querySelectorAll("input"));
    }

    async function handleDelete() {
        console.log("Delete");
    }

    return (
        <>
            <div className="bg-gray-800 text-white p-3 rounded">
                <h3 className="text-lg font-semibold">{opus.title}</h3>
                <ul>
                    <li><strong>Abbreviation: </strong>{opus.code}</li>
                    <li><strong>Language: </strong>{opus.language.name}</li>
                    <li><strong>Author: </strong>{opus.author.name}</li>
                </ul>
            </div>
            <div>
                <div id="header" className="flex flex-row gap-4 bg-black text-amber-600 text-left mt-5">
                    <div className="w-10">#</div>
                    <div className="w-1/2">Line</div>
                    <div className="w-1/4">Citation</div>
                    <div className="w-1/4">Actions</div>
                </div>
                <div id="rows">
                    {opus.lines.map(ln => {
                        return (
                            <div key={ln.id} className="flex flex-row gap-4 my-3">
                                <div className="w-10">{ln.number}</div>
                                <div className="w-1/2">{ln.text}</div>
                                <div className="w-1/4">{ln.locus}</div>
                                <div className="w-1/4">
                                    <span onClick={() => handleEdit(ln.id)}
                                          className="text-blue-600 underline mr-2 hover:cursor-pointer">
                                        Edit
                                    </span>
                                    <span onClick={handleDelete}
                                          className="text-red-600 underline hover:cursor-pointer">Delete</span>
                                </div>
                            </div>
                        )
                    })}
                    <form id="form" onSubmit={handleSubmit} className="flex flex-row gap-4">
                        <input type="number" id="number" name="number" className="w-10"/>
                        <input type="text" id="text" name="text" className="w-1/2"/>
                        <input type="text" id="locus" name="locus" className="w-1/4"/>
                        <input type="hidden" id="opusId" name="opusId" value={opus.id}/>
                        <input type="hidden" id="id" name="id"/>
                        <button type="submit"
                                className="w-1/4 bg-gray-500 text-white rounded-lg p-1 hover:bg-gray-800 transition">Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}