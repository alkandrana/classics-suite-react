import {Link, useNavigate} from "react-router-dom";
import {submitForm} from "../../utils/api.js";

export default function AuthorAdd() {

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        await submitForm(e, "authors");
        navigate(-1);
    }

    return (
        <form onSubmit={handleSubmit} className="text-left text-pink-500 ml-10">
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="code" className="w-50">Abbreviation</label>
                <input type="text" id="code" name="code" className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="name">Common Name</label>
                <input type="text" id="name" name="name" className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="praenomen">First Name (optional)</label>
                <input type="text" id="praenomen" name="praenomen" className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="nomen">Native Name (optional)</label>
                <input type="text" id="nomen" name="nomen" className="border border-red-700 rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4 w-1/2 my-3">
                <label htmlFor="cognomen">Nickname</label>
                <input type="text" id="cognomen" name="cognomen" className="border border-red-700 rounded"/>
            </div>
            <button type="submit"
                    className="bg-green-800 text-white rounded-lg p-3 mr-2 hover:bg-green-500 transition">Submit
            </button>
            <Link to='/authors'
                  className="bg-gray-500 text-white rounded-lg p-3 hover:bg-gray-800 transition">
                Cancel
            </Link>
        </form>
    )
}