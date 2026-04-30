import {useState, useEffect} from "react";
import {useLocation, Link} from "react-router-dom";
import {fetchMetadata} from "../../apiLib.js";


export default function Table() {
    const [itemList, setItemList] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const location = useLocation();
    let controller = location.pathname.split("/").filter(p => p)[0];

    useEffect(() => {
        const fetchAll = async () => {
            const response = await fetch(`http://localhost:3000/${controller}`);
            const content = await response.json();
            if (!response.ok) {
                console.log(`Error fetching ${controller}`, response.status, content);
            } else {
                setItemList(content);
            }
        }
        fetchAll();
        const getMetadata = async () => {
            const metadata = await fetchMetadata(controller);
            if (metadata) {
                setMetadata(metadata);
            }
        }
        getMetadata();
    }, []);

    let header = [];
    if (metadata.length > 0) {
        for (let field of metadata.filter(f => !f.isPrimaryKey)) {
            header.push(<div key={field.name} className="border-r-2">{field.label}</div>);// <div key={code}>Author Abbreviation</div>
        }
    }

    return (
        <div className="">
            <div className="flex p-2">
                <Link to={`/${controller}/add`}
                      className="ml-auto px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-400 transition">
                    Create New
                </Link>
            </div>
            <div className={`grid grid-cols-6 gap-4 font-bold border-b text-blue-600`}>
                {header.map(c => c)}
                <p key="actions">Actions</p>
            </div>
            {itemList.map((record) => (
                <div key={record.id}
                     className={`grid grid-cols-6 gap-4 p-2 text-amber-400 bg-gray-800 border-black border-2`}>
                    {metadata.filter(f => !f.isPrimaryKey).map(f => (
                        <p key={metadata.name} className="border-r-2">{record[f.name]}</p>))}
                    <Link to={`/${controller}/${record.id}/edit`} className="text-blue-600 underline">Edit</Link>
                </div>
            ))}
        </div>
    )
}