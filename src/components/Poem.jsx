import { useState, useEffect } from "react";
import { getFormData, buildSubmitRequest } from "../utils/form_utils.js";
import { sendRequest, fetchOne } from "../utils/api_utils";
import Tooltip from "./ui/Tooltip.jsx";
import { useNavigate } from "react-router-dom";

export default function Poem({ endpoint, workId }) {
  const [lineAdd, setLineAdd] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [work, setWork] = useState(null);

  useEffect(() => {
    const groupLines = (lines) => {
      const sections = Object.groupBy(lines, ({ locus }) => locus);
      return sections;
    };
    fetchOne(workId, endpoint).then((result) => {
      if (result.status == "success") {
        fetchOne(result.data[0].id, "projects").then((workResult) => {
          if (result.status == "success") {
            const sections = groupLines(workResult.data.opus.lines);
            workResult.data.opus.lines = sections;
            setWork(workResult.data);
          } else {
            setErrors(workResult.errors);
          }
        });
      } else if (result.statusCode == 404) {
        setErrors([
          "No project associated with that work exists. Redirecting to Add Project form...",
        ]);
        navigate(`/study/add/${workId}`);
      } else {
        setErrors(result.errors);
        console.log(result);
      }
    });
  }, [lineAdd]);

  const handleNewLine = (e) => {
    const $btn = e.currentTarget;
    const $form = document.getElementById("newLineForm");
    $form.classList.remove("hidden");
    $btn.classList.add("hidden");
  };

  const handleSubmitLine = async (e) => {
    const $form = document.getElementById("newLineForm");
    const $btn = document.getElementById("newLineBtn");
    const lineData = getFormData(e);
    const request = buildSubmitRequest(lineData, "lines");
    const result = await sendRequest(request);
    if (result.status == "success") {
      console.log("Line added successfully: ", result.data);
      setLineAdd(true);
    } else {
      setErrors(result.errors);
    }
    $form.classList.add("hidden");
    $btn.classList.remove("hidden");
  };

  return work && work.opus.author ? (
    <>
      <h2>
        {work.opus.author.name} {work.opus.title}
      </h2>
      {Object.keys(work.opus.lines).length > 0 &&
        Object.keys(work.opus.lines).map((sec) => (
          <table
            key={sec}
            className="min-w-full table-fixed divide-y divide-gray-200 bg-gray-700 text-left text-sm text-white"
          >
            <caption>
              <Tooltip text="First Poem" className="">
                {sec}
              </Tooltip>
            </caption>
            <thead className="bg-gray-500 text-lg font-extrabold tracking-wider text-gray-50">
              <tr>
                <th className="p-3 w-50" scope="col">
                  Line Number
                </th>
                <th className="p-3" scope="col">
                  Text
                </th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {work.opus.lines[sec].map((li) => (
                <tr key={li.id}>
                  <td>{li.number}</td>
                  <td>{li.text}</td>
                  <td>
                    <a
                      className="text-blue-600 underline"
                      href={`/vocab/add/${li.id}`}
                    >
                      Add vocab
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <form
                    onSubmit={handleSubmitLine}
                    className="grid grid-cols-12 gap-4 hidden"
                    id="newLineForm"
                  >
                    <input className="col-span-2" type="number" name="number" />
                    <input className="col-span-6" type="text" name="text" />
                    <input type="hidden" name="opusId" value={work.opus.id} />
                    <input className="col-span-2" type="text" name="locus" />
                    <button
                      className="col-span-2 bg-gray-500 p-2 rounded"
                      type="submit"
                    >
                      Add
                    </button>
                  </form>
                  <button
                    id="newLineBtn"
                    onClick={handleNewLine}
                    className="bg-blue-600 p-3 rounded-lg block mx-auto cursor-pointer"
                    type="button"
                  >
                    Add New Line
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
    </>
  ) : (
    <div className="text-red-500">
      One or more errors occurred:
      {errors.map((error, i) => (
        <p key={i}>{error}</p>
      ))}
    </div>
  );
}
