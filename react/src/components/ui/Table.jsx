import {useEffect} from "react";
import {useLocation, Link} from "react-router-dom";
import {fetchMetadata} from "../../apiLib.js";


export default function Table({records, labels}) {
    // const [metadata, setMetadata] = useState([]);
    const location = useLocation();
    let controller = location.pathname.split("/").filter(p => p)[0];

    useEffect(() => {
        const getMetadata = async () => {
            const metadata = await fetchMetadata(controller);
            if (metadata) {
                setMetadata(metadata);
            }
        }
        // getMetadata();
    }, []);

    let header = [];
    for (let field in labels) {
        header.push(<div key={field} className="border-r-2">{labels[field]}</div>);// <div key={code}>Abbreviation</div>
    }

    console.log("In Table: ", records);


    return (
        <div className="">
            <div className="flex p-2">
                <Link to={`/${controller}/add`}
                      className="ml-auto px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-400 transition">
                    Create New
                </Link>
            </div>
            <div
                className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 font-bold border-b text-blue-600`}>
                {header.map(c => c)}
                <p key="actions">Actions</p>
            </div>
            {records.map((record) => (
                <div key={record.id}
                     className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-2 text-amber-400 bg-gray-800 border-black border-2`}>
                    {Object.keys(labels).map(c => ( // code: Abbreviation, name: Common Name, fullName: Native Name
                        <p key={c} className="border-r-2">{record[c]}</p>))}
                    <Link to={`/${controller}/${record.id}/edit`} className="text-blue-600 underline">Edit</Link>
                </div>
            ))}
        </div>
    )
}