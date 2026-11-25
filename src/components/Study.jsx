import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Poem from "./Poem";
import { fetchOne } from '../utils/api_utils.js';
import { groupLines } from '../utils/basic_utils.js';

export default function Study() {
  const { workId } = useParams();
  const [work, setWork] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [lineAdd, setLineAdd] = useState(false);

  useEffect(() => {

    fetchOne(workId, "projects/work").then((result) => {
      if (result.statusCode == 401){
        navigate("/account/login");
      }
      else if (result.status == "success") {
        fetchOne(result.data[0].id, "projects").then((workResult) => {
          if (result.status == "success") {
            const sections = groupLines(workResult.data.opus.lines);
            workResult.data.opus.lines = sections;
            console.log(sections);
            setWork(workResult.data);
            console.log('Fetched project: ', workResult.data);
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

  return <Poem work={work} errors={errors} newLineSetter={setLineAdd} errorSetter={setErrors} />;
}
