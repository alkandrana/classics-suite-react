import {useParams} from "react-router-dom";
import {deleteOne, submitForm} from "../../utils/api.js";
import {useEffect, useState} from "react";
import {FaRegEdit, FaTrashAlt} from "react-icons/fa";

const url = import.meta.env.VITE_API_URL;
export default function Opus() {
    const {opusId} = useParams();
    const [opus, setOpus] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Rerendering current page: ", currentPage);

    // function getCitationCodes(citation) {
    //     let parts;
    //     if (citation.includes(".")) {
    //         parts = citation.split(".");
    //     } else {
    //         parts = citation.split(" ");
    //     }
    //     const codes = parts.filter(part => part).map(p => p.trim());
    //     return codes;
    // }
    function getFirstPage(linesObj) {
        const sections = Object.keys(linesObj).map(k => Number(k));
        console.log("Work sections: ", sections);
        const firstSection = Math.min(...sections);
        console.log("First section: ", firstSection);
        return firstSection;
    }

    useEffect(() => {
        const getOpus = async () => {
            console.log("Fetching opus");
            const response = await fetch(`${url}opera/${opusId}`);
            const content = await response.json();
            if (response.ok) {
                setOpus(content);
                console.log("Opus complex: ", content);
                setCurrentPage(getFirstPage(content.lines));
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }
        getOpus();
    }, [])

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
        const line = opus.lines[currentPage].find(l => l.id == id);
        document.getElementById("number").defaultValue = line.number;
        document.getElementById("text").defaultValue = line.text;
        document.getElementById("locus").defaultValue = line.locus;
        document.getElementById("id").defaultValue = line.id;
        document.getElementById("form").classList.remove("hidden");
        document.getElementById("addBtn").classList.add("hidden");
    }

    async function handleDelete(id) {
        console.log("Delete: ", id);
        const result = await deleteOne("lines", id);
        console.log(result);
    }

    let $bottom = document.getElementById("addBtn");
    if ($bottom) {
        $bottom.scrollIntoView();
    }
    if (opus) {
        console.log("State object is ready: ", opus);
        console.log("Current page update: ", currentPage);
    }

    return opus && (
        <>
            <h1>{`${opus.title} by ${opus.author.name}`}</h1>
            <div className="bg-gray-800 text-amber-400 p-3 rounded">
                <h3 className="text-lg font-semibold my-5">Title: {opus.title}</h3>
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
                <div className="flex bg-black">
                    <h3 className="mx-auto text-xl bg-black text-purple-500 py-2">{`Book ${currentPage}`}</h3>
                </div>
                <div id="header" className="flex flex-row gap-4 bg-black text-amber-600 text-left mt-5">
                    <div className="w-10">#</div>
                    <div className="w-1/2">Line</div>
                    <div className="w-1/4">Actions</div>
                </div>
                <div id="rows">
                    {
                        opus.lines[currentPage].map(ln => {
                            return (
                                <div key={ln.id} className="flex flex-row gap-4 my-3 text-cyan-300">
                                    <div className="w-10">{ln.number}</div>
                                    <div className="w-1/2">{ln.text}</div>
                                    <div className="w-1/4 flex">
                                        <span onClick={() => handleEdit(ln.id)}
                                              className="text-blue-600 underline mr-2 hover:cursor-pointer">
                                            <FaRegEdit/>
                                        </span>
                                        <span onClick={() => handleDelete(ln.id)}
                                              className="text-red-600 underline mr-2 hover:cursor-pointer">
                                            <FaTrashAlt/>
                                        </span>
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