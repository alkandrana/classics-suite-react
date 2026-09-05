import {useParams} from "react-router-dom";
import {deleteOne, fetchOne, submitForm} from "../../../utils/api.js";
import {useEffect, useState} from "react";
import useApi from "../../../hooks/useApi.js";

const accountUrl = import.meta.env.VITE_ACCOUNT_URL;
const apiUrl = import.meta.env.VITE_API_URL;

export default function Project() {
    const authenticatedFetch = useApi();
    const [opus, setOpus] = useState(null);
    const [project, setProject] = useState(null);
    const {projectId} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    console.log("Rerendering current page: ", currentPage);

    console.log(`In project: ${projectId}`);

    async function getOpusIdFromCitation(citation) {
        const citationParts = citation.split(".")
            .filter(p => p && p.match(/[A-Za-z]/))
            .map(p => p.trim().toUpperCase());
        console.log("Citation Parts:", citationParts);
        const response = await fetch(`${apiUrl}/opera/code/${citationParts[1]}`);
        const content = await response.json();
        console.log("Got opus from citation: ", content);
        if (response.ok) {
            // console.log("Author Code: ", content.filter(p => p.author.code == citation);
            const [opusRecord] = content.filter(p => p.author.code === citationParts[0]);
            console.log("After filter:", opusRecord);
            if (!opusRecord) {
                return null
            } else {
                return opusRecord.id;
            }
        } else {
            console.log("There was a problem fetching the work: ", content, (await response).status);
        }
    }

    // 1.1.0.1
    function sortLines(lines) {
        if (lines.length > 0) {
            return Object.groupBy(lines, ({locus}) => {
                let secs = locus.split(".");
                // 16,1,Hactenus arvorum cultus et sidera caeli:,2.1,1
                return secs.length === 1 ? "1" : secs[0];
            });
        } else {
            return null;
        }
    }

    useEffect(() => {
        const getProject = async () => {
            const projectResponse = await authenticatedFetch(`${accountUrl}/projects/${projectId}`);
            const projectContent = await projectResponse.json();
            if (projectResponse.ok) {
                console.log("Project: ", projectContent);
                setProject(projectContent);
            } else {
                console.log("There was a problem fetching the project : ", projectResponse.status, projectContent);
            }
        }


        getProject();


    }, []);

    useEffect(() => {
        const getOpus = async () => {
            console.log("Fetching opus");
            console.log("Project: ", project);
            const opusId = await getOpusIdFromCitation(project.work);
            if (!opusId) {
                console.log("Work could not be found.");
                return;
            }
            const opusRecord = await fetchOne("opera", opusId);
            if (opusRecord) {
                // TODO: create function to organize the work's lines into pages
                opusRecord.lines = sortLines(opusRecord.lines);
                setOpus(opusRecord);
                console.log("Opus complex: ", opusRecord);
                // lines object keys corresponds to the first part of the citation field (typically books)
                const sections = Object.keys(opusRecord.lines).map(k => Number(k));
                console.log("Work sections: ", sections);
                // get the number of the first section so as to set the pagination functionality
                if (sections.length > 0) {
                    const firstSection = Math.min(...sections);
                    console.log("First section: ", firstSection);
                    setCurrentPage(firstSection);
                }
            }
        }
        if (project) {
            getOpus();
        }
    }, [project])


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

    function toggleVocab() {
        const vocabDivs = document.querySelectorAll(".vocab");
        const btn = document.getElementById("vocabBtn");
        for (let div of vocabDivs) {
            if (div.classList.contains("hidden")) {
                div.classList.remove("hidden");
                div.classList.add("flex", "gap-4");
                btn.innerHTML = "Hide Vocab";
            } else {
                div.classList.add("hidden");
                div.classList.remove("flex", "gap-4");
                btn.innerHTML = "Show Vocab";
            }
        }
    }

    let $bottom = document.getElementById("addBtn");
    if ($bottom) {
        $bottom.scrollIntoView();
    }
    if (opus) {
        console.log("State object is ready: ", opus);
        console.log("Current page update: ", currentPage);
    }

    function getCitationLine(citation) {
        // 1. split into parts
        const parts = citation.split(".").filter(p => p && p.match(/[A-Za-z0-9]/));
        // 2. map to labels: AUTHOR WORK SECTION LINE
        const sections = {
            author: parts[0],
            work: parts[1],
            book: parts[2],
            line: parts[parts.length - 1]
        }
        // 3. current line = last section (line)
        return sections.line;
    }

    let vocab;
    if (project) {
        vocab = project.vocabList;
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
                    <h3 className="ml-auto text-xl bg-black text-purple-500 py-2">{`Book ${currentPage}`}</h3>
                    <button type="button" id="vocabBtn" onClick={toggleVocab}
                            className="ml-auto w-40 btn bg-green-700 hover:bg-green-400">
                        Show Vocab
                    </button>
                </div>
                <div id="header" className="flex flex-row gap-4 bg-black text-amber-600 text-left mt-5">
                    <div className="w-10">#</div>
                    <div className="w-1/2">Line</div>
                    <div className="w-1/4">Vocab</div>
                    <div className="w-1/4">Actions</div>
                </div>
                <div id="rows">
                    {
                        opus.lines && opus.lines[currentPage].map(ln => {
                            const vocabEntries = vocab.filter(v => getCitationLine(v.citation) == ln.number);
                            return (
                                <div key={ln.id} className="flex flex-row gap-4 my-3 text-cyan-300">
                                    <div className="w-10">{ln.number}</div>
                                    <div className="w-1/2">{ln.text}</div>
                                    <div
                                        className="w-1/4 gap-4 text-green-600">{vocabEntries.map(v => (<>
                                        <div key={v.id} className="hidden vocab">
                                            <p>{v.vocab.lemma}</p>
                                            <p>{v.vocab.definition}</p>
                                        </div>
                                    </>))}</div>
                                    <div className="w-1/4">
                    <span onClick={() => handleEdit(ln.id)}
                          className="text-blue-600 underline mr-2 hover:cursor-pointer">
                      Edit
                    </span>
                                        <span onClick={() => handleDelete(ln.id)}
                                              className="text-red-600 underline mr-2 hover:cursor-pointer">Delete</span>
                                        <a href={`/vocab/add/${projectId}`}
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
