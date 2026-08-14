import {Link, useNavigate, useParams, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import useApi from "../../hooks/useApi.js";
import {Vocab} from "../../models/Vocab.js";
import {VocabInstance} from "../../models/VocabInstance.jsx";

const baseUrl = import.meta.env.VITE_ACCOUNT_URL;

export default function VocabForm() {
    const {vocabId} = useParams();
    const {projectId} = useParams();
    console.log("ID: ", vocabId);
    const repos = useOutletContext();
    const authenticatedFetch = useApi();
    const [vocabItem, setVocabItem] = useState(null);
    console.log("Loading repos: ", repos);
    const navigate = useNavigate();

    useEffect(() => {
        const getVocab = async () => {
            const response = await authenticatedFetch(`${baseUrl}/vocab/${vocabId}`);
            let content = await response.json();
            if (response.ok) {
                setVocabItem(content);
                console.log("Fetched entry: ", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }
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
        const newVocab = new Vocab(data.lemma, data.definition, data.pos, data.languageId);
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVocab)
        }
        console.log(newVocab);
        let vocabResponse = await authenticatedFetch(url, options);
        let vocabContent = await vocabResponse.json();
        if (vocabResponse.ok) {
            console.log("Vocab created: ", vocabContent, "Status: ", vocabResponse);
            let newVocabId = vocabContent.id;
            const newInstance = new VocabInstance(data.instance, data.form, data.citation, newVocabId);
            console.log("Preparing Instance: ", newInstance);
            newInstance.projectId = projectId;
            options.body = JSON.stringify(newInstance);
            url = `${baseUrl}/instances`;
            const instanceResponse = await authenticatedFetch(url, options);
            let instanceContent = await instanceResponse.json();
            if (instanceResponse.ok) {
                console.log("Vocab added: ", instanceContent);
            } else {
                console.log("ERROR: ", instanceResponse.status, instanceContent);
            }
        } else {
            console.log("ERROR: ", vocabResponse.status, vocabContent);
        }


        // let response = await authenticatedFetch(url, {
        //     method: method,
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(newVocab),
        // });
        // const content = await response.json();
        // if (response.ok) {
        //     console.log("Vocab updated successfully: ", content);
        //     // navigate('/vocab');
        // } else {
        //     console.log("There was an error updating the vocab: ", response.status, content);
        // }


    }

    return repos.languages.length > 0 && (

        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="lemma" className="w-50">Dictionary Entry</label>
                <input type="text" id="lemma" name="lemma" defaultValue={vocabItem?.lemma || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="instance">Current Instance</label>
                <input type="text" id="instance" name="instance" defaultValue={vocabItem?.instance || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="form">Parsing</label>
                <input type="text" id="form" name="form" defaultValue={vocabItem?.form || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="pos">Part of Speech</label>
                <input type="text" id="pos" name="pos" defaultValue={vocabItem?.pos || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="definition">Translation</label>
                <input type="text" id="definition" name="definition" defaultValue={vocabItem?.definition || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="languageId">Language</label>
                <select id="languageId" name="languageId" defaultValue={vocabItem?.languageId || ""}
                        className="border border-red-700 rounded">
                    <option value="">select a language</option>
                    {repos.languages.map((language) => (
                        <option key={language.id} value={language.id}>{language.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="citation">Location in Text</label>
                <input type="text" id="citation" name="citation" defaultValue={vocabItem?.citation || ""}
                       className="border border-red-700 rounded"/>
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