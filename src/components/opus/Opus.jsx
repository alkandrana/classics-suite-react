import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchOne } from "../../utils/api_utils";
import { getFormData, buildSubmitRequest } from "../../utils/form_utils";
import { sendRequest } from "../../utils/api_utils";

export default function Opus() {
    const { workId } = useParams();
    const [opus, setOpus] = useState(null);
    const [errors, setErrors] = useState([]);
    const [lineAdd, setLineAdd] = useState(false);

    useEffect(() => {
        const getOpus = async () => {
            const result = await fetchOne(workId, "opera");
            if (result.status == "success") {
                setOpus(result.data);
            } else {
                setErrors(result.errors);
            }
        }

        getOpus();
    }, [lineAdd])

    const handleNewLine = (e) => {
        const $btn = e.currentTarget;
        const $form = document.getElementById("newLineForm");
        $form.classList.remove("hidden");
        $btn.classList.add("hidden");
    }

    const handleSubmitLine = async (e) => {
        const $form = document.getElementById("newLineForm");
        const $btn = document.getElementById("newLineBtn");
        const lineData = getFormData(e);
        const request = buildSubmitRequest(lineData, "lines");
        const result = await sendRequest(request)
        if (result.status == "success") {
            console.log("Line added successfully: ", result.data);
            setLineAdd(true);
        } else {
            setErrors(result.errors);
        }
        $form.classList.add("hidden");
        $btn.classList.remove("hidden");
    }

    return (
        <>
            {errors && errors.map((err, i) => (
                <div key={i} className="text-red-500 m-5">{err}</div>
            ))}
            {opus && (
                <table className="min-w-full table-fixed divide-y divide-gray-200 bg-gray-700 text-left text-sm text-white">
                    <caption>{`${opus.author.name} ${opus.title}`}</caption>
                    <thead className="bg-gray-500 text-lg font-extrabold tracking-wider text-gray-50">
                        <tr>
                            <th className="p-3 w-50" scope="col">Line Number</th>
                            <th className="p-3" scope="col">Text</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {opus.lines.length > 0 && opus.lines.map((li) => (
                            <tr key={li.id}>
                                <td >{li.number}</td>
                                <td>{li.text}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2">
                                <form onSubmit={handleSubmitLine} className="grid grid-cols-4 gap-4 hidden" id="newLineForm">

                                    <input type="number" name="number" />
                                    <input type="text" name="text" />
                                    <input type="hidden" name="opusId" value={opus.id} />
                                    <input type="text" name="locus" />
                                    <button className="bg-gray-500 p-2 rounded" type="submit">Add</button>
                                </form>
                                <button id="newLineBtn" onClick={handleNewLine} className="bg-blue-600 p-3 rounded-lg block mx-auto cursor-pointer" type="button">Add New Line</button>
                            </td>
                        </tr>

                    </tbody>
                    {/* <tfoot>
                <tr>
                    <td colSpan="3">Total Budget</td>
                    <td>$14,200</td>
                </tr>
            </tfoot> */}
                </table>
            )}

        </>
    )

}