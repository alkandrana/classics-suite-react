import {useNavigate, Link} from "react-router-dom";
import {useEffect} from "react";

export default function Form(recordType, instance = null) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetadata = async () => {
            let url =
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        const record = Object.fromEntries(formData.entries());
        console.log("Constructed object to create: ", record);
        let url, method;
        if (instance) {
            url = `http://localhost:3000/${recordType}/${instance.id}`;
            method = "PATCH";
        } else {
            url = `http://localhost:3000/${recordType}`;
            method = "POST";
        }
        const response = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(record),
        });
        const content = await response.json();
        if (response.ok) {
            console.log(content);
            navigate(`/${recordType}`);
        } else {
            console.log("Error updating record: ", response.status, content);
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