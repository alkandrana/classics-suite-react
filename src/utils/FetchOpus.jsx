import {useState, useEffect} from "react";
import {fetchAll} from "./api.js";
import {Outlet} from "react-router-dom";

export default function FetchOpus() {
    console.log("In Fetch Opus");
    const [repo, setRepo] = useState(null);

    useEffect(() => {
        const getOpera = async () => {
            const opera = await fetchAll("opera/complex");
            const authors = await fetchAll("authors");
            const languages = await fetchAll("languages");
            const data = {
                opera: opera,
                authors: authors,
                languages: languages,
            };
            setRepo(data);
        }

        getOpera();
    }, []);

    return <>{repo && <Outlet context={repo}/>}</>
}