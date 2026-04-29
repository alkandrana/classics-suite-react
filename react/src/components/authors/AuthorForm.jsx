import {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

export default function AuthorForm() {
    const [author, setAuthor] = useState("");
    const {authorId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch(`http://localhost:3000/authors/${authorId}`);
            const content = await response.json();
            if (response.ok) {
                setAuthor(content);
                console.log(content);
            } else {
                console.log("Error fetching author: ", response.status, content);
            }
        }

        const fetchMetadata = async () => {
            let url = "http://localhost:3000/authors/metadata";
            const response = await fetch(url);
            const content = await response.json();
            if (response.ok) {
                console.log("Authors metadata: ", content);
            } else {
                console.log("Error fetching author: ", response.status, content);
            }
        }

        if (authorId) {
            fetchAuthors();
        }
        fetchMetadata();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        const authorRecord = Object.fromEntries(formData.entries());
        if (!authorRecord.code || !authorRecord.name) {
            console.log("Author Abbrv. and Name are required.");
        }
        console.log("Constructed object to create: ", authorRecord);
        let url, method;
        if (authorId) {
            url = `http://localhost:3000/authors/${authorId}`;
            method = "PATCH";
        } else {
            url = "http://localhost:3000/authors";
            method = "POST";
        }
        console.log(url, method);
        console.log(JSON.stringify(authorRecord));
        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(authorRecord),
        });
        const content = await response.json();
        if (response.ok) {
            console.log(content);
            navigate('/authors');
        } else {
            console.log("Error updating author: ", response.status, content);
        }


    }

    return (
        <form onSubmit={handleSubmit} className="text-yellow-600">
            <div className="mb-4 grid grid-cols-2 gap-4">
                <label htmlFor="code" className="text-right text-sm font-semibold mb-2">
                    Author Abbrv.
                </label>
                <input type="text" id="code" name="code" defaultValue={author.code}
                       className="w-1/2 px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <label htmlFor="name" className="text-right text-sm font-semibold mb-2">
                    Common Name
                </label>
                <input type="text" id="name" name="name" defaultValue={author.name}
                       className="w-1/2 px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <label htmlFor="praenomen" className="text-right text-sm font-semibold mb-2">
                    Praenomen
                </label>
                <input type="text" id="praenomen" name="praenomen" defaultValue={author.praenomen}
                       className="w-1/2 px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <label htmlFor="nomen" className="text-right text-sm font-semibold mb-2">
                    Native Name
                </label>
                <input type="text" id="nomen" name="nomen" defaultValue={author.nomen}
                       className="w-1/2 px-3 py-2 border rounded"/>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
                <label htmlFor="cognomen" className="text-right text-sm font-semibold mb-2">
                    Cognomen
                </label>
                <input type="text" id="cognomen" name="cognomen" defaultValue={author.cognomen}
                       className="w-1/2 px-3 py-2 border rounded"/>
            </div>
            <button type="submit"
                    className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-400 transition">Create
            </button>
            <Link to="/authors"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-400 transition">Cancel</Link>
        </form>
    )
}