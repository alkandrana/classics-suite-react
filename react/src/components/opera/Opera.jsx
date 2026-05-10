import {useEffect, useState} from "react";
import {fetchAll, fetchOne} from "../../utils/api.js";
import {Link} from "react-router-dom";

export default function Opera() {
    const [opera, setOpera] = useState([]);

    useEffect(() => {
        const getWorks = async () => {
            const opera = await fetchAll("works");
            console.log(opera);
            for (const o of opera) {
                if (o.languageId) {
                    o.language = await fetchOne("languages", o.languageId);
                }
                o.author = await fetchOne("authors", o.authorId);
            }
            setOpera(opera);
            console.log("Fetching in Opera: ", opera);
        }

        getWorks();
    }, []);

    return opera.length > 0 ? (
        <>
            <div>
                <form onSubmit={searchFilter}>

                </form>
            </div>
            <h1>Works</h1>
            <Link to={`/works/add`}
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition flex ml-auto w-25">
                Add New
            </Link>
            <div id="header" className="flex flex-row bg-black mt-5">
                <div className="w-1/5">Abbreviation</div>
                <div className="w-1/5">Title</div>
                <div className="w-1/5">Language</div>
                <div className="w-1/5">Author</div>
                <div className="w-1/5">Lines</div>
                <div className="w-1/5">Actions</div>
            </div>
            {opera.map((opus) => {
                return (
                    <div key={opus.id}
                         className="flex flex-row py-3 bg-gray-700">
                        <div className="w-1/6">{opus.code}</div>
                        <div className="w-1/6">{opus.title}</div>
                        <div className="w-1/6">{opus.language?.name || ""}</div>
                        <div className="w-1/6">{opus.author.name}</div>
                        <div className="w-1/6">{opus.lineCount}</div>
                        <div className="w-1/6">
                            <Link to={`/works/${opus.id}/edit`} className="text-blue-600 underline m-1">
                                Edit
                            </Link>
                            <Link to={`/works/${opus.id}`} className="text-blue-600 underline">
                                View
                            </Link>
                        </div>
                    </div>
                )
            })}
        </>
    ) : (
        <>
            <div className="text-xl text-red-600 font-bold mb-10">No Records Found</div>
            <Link to="/works/add"
                  className="bg-purple-700 text-white rounded-lg p-3 mb-10 hover:bg-pink-600 transition">
                Add New
            </Link>
        </>
    )
}