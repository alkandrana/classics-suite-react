import { useParams } from "react-router-dom";
import Poem from "./Poem";
export default function Study(){
    const {workId} = useParams();
    console.log(`Getting work: ${workId}`)
    return <Poem workId={workId} endpoint={"projects"}/>;
}
