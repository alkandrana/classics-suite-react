import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useApi from "../../hooks/useApi.js";

const baseUrl = import.meta.env.VITE_ACCOUNT_URL;

export default function VocabForm() {
    const {vocabId} = useParams();
    const {projectId} = useParams();
    const [vocab, setVocab] = useState(null);
    const [languages, setLanguages] = useState([]);
    console.log(vocabId ? `ID: ${vocabId}` : "Ready to add new instance");
    console.log("Adding to project: ", projectId);
    const authenticatedFetch = useApi();
    const navigate = useNavigate();

    useEffect(() => {
        const getVocab = async () => {
            const response = await authenticatedFetch(`${baseUrl}/vocab/${vocabId}`);
            let content = await response.json();
            if (response.ok) {
                setVocab(content);
                console.log("Fetched entry: ", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }

        const getLanguages = async () => {
            const response = await authenticatedFetch(`${baseUrl}/languages`);
            const content = await response.json();
            if (response.ok) {
                setLanguages(content);
                console.log("Languages:", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }
        getLanguages();
        if (vocabId) {
            getVocab();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        let data = Object.fromEntries(formData.entries());
        console.log("Getting data out of form: ", data);
        let url = `${baseUrl}/vocab`;
        let method = 'POST';
        if (vocabId) {
            url += `/${vocabId}`;
            method = 'PATCH';
        }
        const options = {
            method,
            body: JSON.stringify(data)
        }
        console.log("Ready to post: ", url, options);
        let response = await authenticatedFetch(url, options);
        let content = await response.json();
        if (response.ok) {
            console.log("Vocab created: ", content, "Status: ", response);
            navigate(`/vocab/instances/add/${projectId}`);
        } else {
            console.log("ERROR: ", response.status, content);
        }
    }

    return languages.length > 0 && (
        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="lemma">Dictionary Entry</label>
                <input type="text" id="lemma" name="lemma" defaultValue={vocab?.lemma || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="definition">Translation</label>
                <input type="text" id="definition" name="definition" defaultValue={vocab?.definition || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="partOfSpeech">Part Of Speech</label>
                <input type="text" id="partOfSpeech" name="partOfSpeech" defaultValue={vocab?.partOfSpeech || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-3 gap-4 w-1/2 my-3">
                <label htmlFor="languageId">Language</label>
                <select id="languageId" name="languageId" defaultValue={vocab?.languageId || ""}
                        className="border border-red-700 rounded">
                    <option value="">select a language</option>
                    {languages.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">
                Submit
            </button>
            <Link to={`/study/projects/${projectId}`}
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </Link>
        </form>
    )
}