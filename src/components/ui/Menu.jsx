import {useLocation} from 'react-router-dom';
import {IoHomeOutline, IoListCircle} from "react-icons/io5";
import {VscAccount} from "react-icons/vsc";
import {GrProjects} from "react-icons/gr";

export default function Menu() {
    const location = useLocation();
    let currentPath = location.pathname;
    const routePatterns = {
        home: /\/account\/$/,
        profile: /\/account\/profile/,
        projects: /\/account\/projects/,
        vocab: /\/account\/vocab/
    };

    let active = "bg-gray-300 hover:bg-gray-400";

    return (
        <div className="drawer md:drawer-open" style={{width: "auto"}}>
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <label htmlFor="my-drawer-3" className="btn drawer-button md:hidden text-sm w-20">
                Menu
            </label>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 text-amber-600">
                    {/* Sidebar content here */}
                    <li className="mt-10 md:mt-0">
                        <a href="/account"
                           className={`p-3 font-semibold text-xl ${currentPath.match(routePatterns.home) ? active : ""}`}>
                            <IoHomeOutline className='text-xl'/>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/account/profile"
                           className={`p-3 font-semibold text-xl ${currentPath.match(routePatterns.profile) ? active : ''}`}>
                            <VscAccount/>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a href="/account/vocab"
                           className={`p-3 font-semibold text-xl ${currentPath.match(routePatterns.vocab) ? active : ""}`}>
                            <IoListCircle/>
                            Vocab Lists
                        </a>
                    </li>
                    <li>
                        <a href="/account/projects"
                           className={`p-3 font-semibold text-xl ${currentPath.match(routePatterns.projects) ? active : ''}`}>
                            <GrProjects/>
                            Projects
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

