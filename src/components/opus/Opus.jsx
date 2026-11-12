import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Opus() {
    const { workId } = useParams();
    const [opus, setOpus] = useState(null);
    const [errors, setErrors] = useState([]);

    const sendRequest = async (request) => {
        const result = {};
        const response = await fetch(request.url, request.options);
        try {
            if (response.ok) {
                result.status = "success"
                const content = await response.json();
                result.data = content;
            } else {
                result.status = "error"
                const content = await response.json();
                result.errors.push(content)
            }
        } catch (err) {
            result.errors.push(`Generic Error: ${e.name}: No response returned.`);
        }
        return result;
    }

    const fetchOne = async (recordId, setter, endpoint) => {
        const request = {
            url: `http://localhost:5232/${endpoint}/${recordId}`,
            options: {
                method: "GET"
            }
        }
        const result = await sendRequest(request);
        if (result.status == "success") {
            setter(result.data);
        } else {
            setErrors(result.errors);
        }
    }

    useEffect(() => {
        fetchOne(workId, setOpus, "opera");
    }, [])

    return opus && (
        <table className="min-w-full divide-y divide-gray-200 bg-gray-700 text-left text-sm text-white">
            <caption>{`${opus.author.name} ${opus.title}`}</caption>
            <thead className="bg-gray-500 text-lg font-extrabold tracking-wider text-gray-50">
                <tr>
                    <th className="p-3" scope="col">Line Number</th>
                    <th className="p-3" scope="col">Text</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {opus.lines.length > 0 && opus.lines.map((li) => (
                    <tr>
                        <td>{li.number}</td>
                        <td>{li.text}</td>
                    </tr>
                ))}

            </tbody>
            {/* <tfoot>
                <tr>
                    <td colSpan="3">Total Budget</td>
                    <td>$14,200</td>
                </tr>
            </tfoot> */}
        </table>
    )

}