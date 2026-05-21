import {useEffect, useState} from "react";
import useApi from "../../hooks/useApi";
import {Link} from "react-router-dom";
import {FaEdit} from "react-icons/fa";
import Menu from "../ui/Menu.jsx";

export default function VocabList() {
    const [vocab, setVocab] = useState([]);
    const authenticatedFetch = useApi();

    useEffect(() => {
        const getVocab = async () => {
            const response = await authenticatedFetch('http://localhost:3000/vocab');
            let content = await response.json();
            if (response.ok) {
                setVocab(content);
                console.log("Your Vocab List: ", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }
        getVocab();
    }, []);

    return (
        <div className="flex w-full">
            <Menu/>
            {vocab.length > 0 ? (
                <div id="vocabTable">
                    <div
                        className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 font-bold border-b text-blue-600`}>
                        <p>Dictionary Entry</p>
                        <p>Definition</p>
                        <p>Language</p>
                        <p>Part of Speech</p>
                        <p>Citations</p>
                        <p>Actions</p>
                    </div>
                    {
                        vocab.map((voc) => (
                            <div key={voc.id}
                                 className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-2 text-amber-400 bg-gray-800 border-black border-2`}>
                                <p>{voc.lemma}</p>
                                <p>{voc.definition}</p>
                                <p>{voc.languageId}</p>
                                <p>{voc.pos}</p>
                                <p>{"TBA"}</p>
                                <Link to={`/vocab/${vocab.id}/edit`}
                                      className="text-blue-600 underline"><FaEdit/></Link>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <div className="text-xl text-red-500 ml-3">
                    <p className="pb-5">You don't have any vocab lists yet. Choose a project to get started:</p>
                    <a href="/works"
                       className="bg-purple-700 text-white rounded-lg m-10 p-2 hover:bg-purple-400 transition text-sm">
                        Available Works
                    </a>
                    <p className="py-5">Or add your own:</p>
                    <a href="/works/add"
                       className="bg-green-500 text-white rounded-lg m-10 p-2 hover:bg-green-700 transition text-sm">
                        Add a Work
                    </a>
                </div>
            )}</div>
    )
}