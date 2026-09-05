import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useApi from "../../hooks/useApi.js";

const baseUrl = import.meta.env.VITE_ACCOUNT_URL;

export default function InstanceForm() {
    const {instanceId} = useParams();
    const {projectId} = useParams();
    console.log(instanceId ? `ID: ${instanceId}` : "Ready to add new instance");
    console.log("Adding to project: ", projectId);
    const [vocab, setVocab] = useState([]);
    const authenticatedFetch = useApi();
    const [vocabInstance, setVocabInstance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getInstance = async () => {
            const response = await authenticatedFetch(`${baseUrl}/instances/${instanceId}`);
            let content = await response.json();
            if (response.ok) {
                setVocabInstance(content);
                console.log("Fetched entry: ", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }

        const getVocab = async () => {
            const response = await authenticatedFetch(`${baseUrl}/vocab`);
            let content = await response.json();
            if (response.ok) {
                setVocab(content);
                console.log("Fetched vocab list: ", content);
            } else {
                console.log("ERROR: ", response.status, content);
            }
        }

        getVocab();
        if (instanceId) {
            getInstance();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let target = e.target;
        let formData = new FormData(target);
        let data = Object.fromEntries(formData.entries());
        console.log("Getting data out of form: ", data);
        data['projectId'] = projectId;
        let url = `${baseUrl}/instances`;
        let method = 'POST';
        if (instanceId) {
            url += `/${instanceId}`;
            method = 'PATCH';
        }
        const options = {
            method,
            body: JSON.stringify(data)
        }
        console.log("Ready to post:", url, options);
        let response = await authenticatedFetch(url, options);
        let content = await response.json();
        if (response.ok) {
            console.log("Vocab created: ", content, "Status: ", response);
            navigate(`/study/projects/${projectId}`);

            // let newVocabId = vocabContent.id;
            // const newInstance = new VocabInstance(data.instance, data.form, data.citation, newVocabId);
            // console.log("Preparing Instance: ", newInstance);
            // newInstance.projectId = projectId;
            // options.body = JSON.stringify(newInstance);
            // url = `${baseUrl}/instances`;
            // const instanceResponse = await authenticatedFetch(url, options);
            // let instanceContent = await instanceResponse.json();
            // if (instanceResponse.ok) {
            //     console.log("Vocab added: ", instanceContent);
            // } else {
            //     console.log("ERROR: ", instanceResponse.status, instanceContent);
            // }
        } else {
            console.log("ERROR: ", response.status, content);
        }
    }

    return (

        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="instance">Current Instance</label>
                <input type="text" id="instance" name="instance" defaultValue={vocabInstance?.instance || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="form">Parsing</label>
                <input type="text" id="form" name="form" defaultValue={vocabInstance?.form || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-3 gap-4 w-1/2 my-3">
                <label htmlFor="vocabId">Vocab Entry</label>
                <select id="vocabId" name="vocabId" defaultValue={vocabInstance?.vocabId || ""}
                        className="border border-red-700 rounded">
                    <option value="">select a vocab item</option>
                    {vocab.map((v) => (
                        <option key={v.id} value={v.id}>{v.lemma}</option>
                    ))}
                </select>
                <a href={`/vocab/add/${projectId}`} className="text-blue-700 underline">Add New Vocab</a>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="citation">Location in Text</label>
                <input type="text" id="citation" name="citation" defaultValue={vocabInstance?.citation || ""}
                       className="border border-red-700 rounded"/>
            </div>
            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">Submit
            </button>
            <Link to={`/study/projects/${projectId}`}
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </Link>
        </form>
    )
}