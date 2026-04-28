import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function Authors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch("http://localhost:3000/authors");
            const content = await response.json();
            if (!response.ok) {
                console.log("Error fetching authors", response.status, content);
            } else {
                setAuthors(content);
            }
        }
        fetchAuthors();
    }, []);
    console.log(authors);
    return (
        <div className="">
            <Link to="/authors/add" className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-400 transition">Create New</Link>
            <div className="grid grid-cols-4 gap-4 font-bold border-b">
                <p>Author Abbrv.</p>
                <p>Common Name</p>
                <p>Native Name</p>
                <p>Actions</p>
            </div>
            {authors.map((author) => (
                <div key={author.id} className="grid grid-cols-4 gap-4">
                    <p>{author.code}</p>
                    <p>{author.name}</p>
                    <p>{`${author.praenomen} ${author.nomen} ${author.cognomen}`}</p>
                    <Link to={`/authors/${author.id}/edit`}>Edit</Link>
                </div>
            ))}
        </div>
    )
}