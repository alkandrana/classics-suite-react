import { useNavigate, useParams } from "react-router-dom";
import { getFormData, buildSubmitRequest } from "../utils/form_utils";
import { fetchOne, sendRequest } from "../utils/api_utils";
import { useState } from "react";
import SimpleInput from "./form/SimpleInput";

export default function AddComment() {
  const { lineId } = useParams();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getWorkId = async () => {
    const result = await fetchOne(lineId, "lines");
    if (result.status == "success") {
      return result.data.opusId;
    } else {
      setErrors(result.errors);
    }
  };
  async function handleAddVocab(e) {
    const data = getFormData(e);
    data.lineId = lineId;
    const request = buildSubmitRequest(data, "comments");
    const result = await sendRequest(request);
    const workId = await getWorkId();
    if (result.status == "error") {
      setErrors(result.errors);
    } else {
      navigate(`/study/${workId}`);
    }
  }

  return (
    <>
      <div className="text-red-600">
        {errors.map((e) => (
          <p>{e}</p>
        ))}
      </div>
      <form onSubmit={handleAddVocab}>
        <SimpleInput label="Comment" name="note" datatype="text" />
        <SimpleInput
          label="Referenced Phrase in Line"
          name="reference"
          datatype="text"
        />
        <button type="submit" className="bg-green-600 p-3 rounded">
          Add Comment
        </button>
      </form>
    </>
  );
}
