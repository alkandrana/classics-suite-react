import {Link} from 'react-router-dom'

export default function HomePage() {
    return (
        <p className="grid grid-cols-2 gap-4">
            <Link to="/authors"
                  className="px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-gray-600 transition">Authors</Link>
            <Link to="/works"
                  className="px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-gray-600 transition">Works</Link>
        </p>
    )
}