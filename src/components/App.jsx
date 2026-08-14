import {Outlet} from 'react-router-dom';
import {IoBookSharp} from 'react-icons/io5';
import {MdPersonPin, MdAccountBalance} from 'react-icons/md';

function App() {
    return (
        <div id="main">
            <div className="drawer">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar bg-base-300 w-full text-purple-500">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Classics Suite</div>
                        <div className="hidden flex-none lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                <li><a href="/account/profile">Profile</a></li>
                                <li><a href="/account/projects">Projects</a></li>
                                <li><a href="/account/vocab">Vocab</a></li>
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <div className="">
                        <Outlet/>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li><a href="/account"><MdAccountBalance/>&nbsp;Account</a></li>
                        <li><a href="/authors"><MdPersonPin/>&nbsp;Authors</a></li>
                        <li><a href="/works"><IoBookSharp/>&nbsp;Works</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default App