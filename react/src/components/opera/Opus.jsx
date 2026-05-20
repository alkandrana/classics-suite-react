import {useParams} from "react-router-dom";
import {deleteOne, fetchOne, submitForm} from "../../utils/api.js";
import {useEffect, useState} from "react";

export default function Opus() {

    const [opus, setOpus] = useState(null);
    const {opusId} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Current page: ", currentPage);

    console.log(`In opus: ${opusId}`);
    useEffect(() => {
        const getOpus = async () => {
            const opus = await fetchOne("works", opusId);
            console.log("Fetching current work: ", opus);
            setOpus(opus);
            const sections = Object.keys(opus.lines).map(k => Number(k));
            const firstSection = Math.min(...sections);
            setCurrentPage(firstSection);
        }
        getOpus();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        await submitForm(e, "lines");
        document.getElementById("addBtn").classList.remove("hidden");
        e.target.classList.add("hidden");
    }

    function handleNewLine(e) {
        const $form = document.getElementById("form");
        const $btn = e.target;
        console.log($btn);
        $form.classList.remove("hidden");
        $btn.classList.add("hidden");
    }

    function handleEdit(id) {
        const line = opus.lines.find(l => l.id == id);
        document.getElementById("number").defaultValue = line.number;
        document.getElementById("text").defaultValue = line.text;
        document.getElementById("locus").defaultValue = line.locus;
        document.getElementById("id").defaultValue = line.id;
        document.getElementById("form").classList.remove("hidden");
        document.getElementById("addBtn").classList.add("hidden");
    }

    async function handleDelete(id) {
        console.log("Delete");
        const result = await deleteOne("lines", id);
        console.log(result);
    }

    let $bottom = document.getElementById("addBtn");
    if ($bottom) {
        $bottom.scrollIntoView();
    }
    return opus && (
        <>
            <h1>{`${opus.title} by ${opus.author.name}`}</h1>
            <div className="text-left bg-gray-800 text-amber-400 p-3 rounded w-60">
                <h3 className="text-lg font-semibold my-5">{opus.title}</h3>
                <ul>
                    <li className="my-5"><strong>Abbreviation: </strong>{opus.code}</li>
                    <li className="my-5"><strong>Language: </strong>{opus.language.name}</li>
                    <li className="my-5"><strong>Author: </strong>{opus.author.name}</li>
                </ul>
            </div>
            <div className="w-1/6 flex ml-auto">
            <span className="text-right text-blue-500 underline hover:cursor-pointer"
                  onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
                Previous
            </span>
                &nbsp;{currentPage}&nbsp;
                <span className="text-right text-blue-500 underline hover:cursor-pointer"
                      onClick={() => setCurrentPage(currentPage < Object.keys(opus.lines).length ? currentPage + 1 : currentPage)}>
                Next
            </span>
            </div>
            <div>
                <h3 className="text-xl bg-black text-purple-500 py-2">{`Book ${currentPage}`}</h3>
                <div id="header" className="flex flex-row gap-4 bg-black text-amber-600 text-left mt-5">
                    <div className="w-10">#</div>
                    <div className="w-1/2">Line</div>
                    <div className="w-1/4">Citation</div>
                    <div className="w-1/4">Actions</div>
                </div>
                <div id="rows">

                    {
                        opus.lines[currentPage].map(ln => {
                            return (
                                <div key={ln.id} className="flex flex-row gap-4 my-3 text-cyan-300">
                                    <div className="w-10">{ln.number}</div>
                                    <div className="w-1/2">{ln.text}</div>
                                    <div className="w-1/4">{ln.locus}</div>
                                    <div className="w-1/4">
                                                    <span onClick={() => handleEdit(ln.id)}
                                                          className="text-blue-600 underline mr-2 hover:cursor-pointer">
                                                        Edit
                                                    </span>
                                        <span onClick={handleDelete}
                                              className="text-red-600 underline mr-2 hover:cursor-pointer">Delete</span>
                                        <a href="/vocab/add"
                                           className="text-green-600 underline mr-2 hover:cursor-pointer">Add Vocab</a>
                                    </div>
                                </div>

                            )
                        })

                    }
                    <form id="form" onSubmit={handleSubmit} className="flex flex-row gap-4 hidden">
                        <input autoFocus type="number" id="number" name="number" className="w-10"/>
                        <input type="text" id="text" name="text" className="w-1/2"/>
                        <input type="text" id="locus" name="locus" className="w-1/4"/>
                        <input type="hidden" id="opusId" name="opusId" value={opus.id}/>
                        <input type="hidden" id="id" name="id"/>
                        <button type="submit"
                                className="btn btn-secondary">Submit
                        </button>
                    </form>
                    <button type="button" id="addBtn" onClick={handleNewLine} className="btn bg-blue-600">Add Line
                    </button>
                </div>
            </div>
        </>
    )
}