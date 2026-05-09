import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Authors() {
    const [authors, setAuthors] = useState([]);


    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch('http://localhost:3000/authors');
            const content = await response.json();
            if (response.ok) {
                setAuthors(content);
                console.log(content);
            } else {
                console.log("There was an error fetching authors: ", response.status, content);
            }
        }

        fetchAuthors();
    }, []);

    return authors.length > 0 && (
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
                        <div>{`${author.praenomen || ""} ${author.nomen || ""} ${author.cognomen || ""}`}</div>
                    </div>
                ))
            }
        </>
    )
}