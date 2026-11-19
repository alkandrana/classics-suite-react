import { getFormData, buildSubmitRequest } from "../utils/form_utils";
import { fetchAll, fetchOne, sendRequest } from "../utils/api_utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SimpleInput from "./form/SimpleInput";
import Select from "./form/Select";

export default function AddVocab(){

    const [errors, setErrors] = useState([]);
    const [line, setLine] = useState(null);
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
    const {lineId} = useParams();

    useEffect(() => {
        fetchOne(lineId, "lines").then((result) => {
            if (result.status == "success"){
                setLine(result.data);
            } else {
                setErrors(errors);
            }
        });

        fetchAll("languages").then((result) => {
            if (result.status == "success"){
                setLanguages(result.data);
            } else {
                setErrors(errors);
            }
        });
    }, []);

    const checkExists = async(endpoint, value) => {
        const response = await fetch(`http://localhost:5232/${endpoint}/${value}`);
        if (response.ok()){
            return response.json();
        } else if (response.status == 404){
            return null;
        } else {
            console.log(`An error occurred: ${response.status}`);
            return;
        }
    }
    const handleAddVocab = async (e) => {
        const data = getFormData(e);
        const entryExists = await checkExists("vocab/lemma", data.lemma);
        const refData = {
            instance: data.instance,
            form: data.form,
            vocabId: 0,
            lineId: lineId
        }
        if (!entryExists){
            const vocabData = {
                lemma: data.lemma,
                definition: data.definition,
                languageId: data.languageId,
                partOfSpeech: data.partOfSpeech
            };
            const vocabRequest = buildSubmitRequest(vocabData, "vocab");
            const result = await sendRequest(vocabRequest);
            if (result.status == "error"){
                setErrors(result.errors);
            } else {
                refData.vocabId = result.data.id;
            }
        } else {
            refData.vocabId = entryExists.id;
        }

        const refRequest = buildSubmitRequest(data, "instances");
        const refResult = await sendRequest(refRequest);
        if (refResult.status == "error"){
            setErrors(refResult.errors);
        } else {
            navigate(`/study/${line.opusId}`)
        }
    }

    return languages && (
        <form onClick={handleAddVocab}>
            <SimpleInput name="lemma" label="Dictionary Entry" datatype="text" />
            <SimpleInput name="instance" label="Form in sentence" datatype="text" />
            <SimpleInput name="form" label="Parsing" datatype="text" />
            <SimpleInput name="partOfSpeech" label="Part of Speech" datatype="text" />
            <SimpleInput name="definition" label="Definition" datatype="text" />
            <Select records={languages} name="languageId" label="Language" />
            <button className="bg-green-600 p-3 rounded cursor-pointed" type="submit">Add</button>
        </form>
    )
}
