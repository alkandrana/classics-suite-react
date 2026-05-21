import {Link} from "react-router-dom";

export default function Button({url, color}) {
    return (
        <Link to={url}
              className={`${color} text-white rounded-lg p-3 mb-10 hover:bg-purple-400 transition flex ml-auto w-25`}>
            Add New
        </Link>
    )
}