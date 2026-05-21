import {useState, useEffect} from "react";
import {fetchAll, fetchOne} from "../../apiLib.js";
import Table from "../ui/Table.jsx";

export default function Opera() {
    const [opera, setOpera] = useState([]);

    useEffect(() => {
        const getOpera = async () => {
            const opera = await fetchAll("works");
            const display = [];
            for (let o of opera) {
                const author = await fetchOne("authors", o.authorId);
                display.push({
                    id: o.id,
                    code: o.code,
                    name: o.title,
                    language: o.language,
                    author: author.name
                });
            }
            setOpera(display);
        }
        getOpera();
    }, []);

    const labels = {
        code: "Abbreviation",
        name: "Title",
        language: "Language",
        author: "Author Name"
    }

    return (
        <Table records={opera} labels={labels}/>
    )
}