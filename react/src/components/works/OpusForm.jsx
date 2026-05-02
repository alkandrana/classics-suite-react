import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchAll, fetchOne} from '../../apiLib.js'
import Form from "../ui/Form.jsx";

export function OpusForm() {
    const [opus, setOpus] = useState(null);
    const [authors, setAuthors] = useState([]);
    const {workId} = useParams();

    useEffect(() => {
        const getOpus = async () => {
            const opus = await fetchOne("works", workId);
            setOpus(opus);
            console.log("Fetching work: ", opus);
        }
        if (workId) {
            getOpus();
        }

        const getAuthors = async () => {
            const authors = await fetchAll("authors");
            const displayAuthors = [];
            for (const author of authors) {
                displayAuthors.push({
                    id: author.id,
                    name: author.name,
                    code: author.code
                });
            }
            setAuthors(displayAuthors);
        }
        getAuthors();
    }, []);

    return (
        <Form instance={opus} values={authors} controller="works"/>
    )
}