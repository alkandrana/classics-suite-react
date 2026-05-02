import {useState, useEffect} from "react"
import Table from "../ui/Table.jsx";
import {fetchAll} from "../../apiLib.js";

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const getAuthors = async () => {
            const authors = await fetchAll("authors");
            const displayAuthors = [];
            for (let a of authors) {
                displayAuthors.push({
                    id: a.id,
                    code: a.code,
                    name: a.name,
                    fullName: `${a.praenomen || ""} ${a.nomen || ""} ${a.cognomen || ""}`
                });
            }
            setAuthors(displayAuthors);
        }
        getAuthors();
    }, []);

    const cols = {
        code: "Abbreviation",
        name: "Common Name",
        fullName: "Native Name",
    }

    return authors.length > 0 && (
        <Table records={authors} labels={cols}/>
    )
}