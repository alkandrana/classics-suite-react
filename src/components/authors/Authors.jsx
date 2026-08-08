import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchAll} from "../../apiLib.js";

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const getAuthors = async () => {
            const authors = await fetchAll("authors");
            console.log("Fetched: ", authors);
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
            console.log("Configured data: ", displayAuthors);
        }
        getAuthors();
    }, []);

    return authors.length > 0 ? (
        <>
            <Link to="/authors/add"
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition flex ml-auto w-25">Add
                New</Link>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 bg-black mt-5">
                <div>Abbreviation</div>
                <div>Common Name</div>
                <div>Full Name</div>
            </div>

            {
                authors.map((author) => (
                    <div key={author.id}
                         className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 py-3 bg-gray-700 border-b-black">
                        <div>{author.code}</div>
                        <div>{author.name}</div>
                        <div>{author.fullName}</div>
                    </div>
                ))
            }
        </>
    ) : (
        <>
            <div className="text-xl text-red-600 font-bold mb-10">No Records Found</div>
            <Link to="/authors/add"
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition">
                Add New
            </Link>
        </>
    )
}