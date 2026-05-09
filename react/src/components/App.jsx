import {Link, Outlet} from 'react-router-dom';

function App() {
    function displayMenu() {
        const $links = document.getElementById('links');
        const $menu = document.querySelector('nav');
        const $btn = document.getElementById('menuBtn');
        if ($links.classList.contains('hidden')) {
            $links.classList.remove('hidden');
            $menu.classList.add('bg-red-950');
        } else {
            $links.classList.add('hidden');
            $menu.classList.remove('bg-red-950');
        }


    }

    return (
        <div id="main">
            <div className="flex flex-row">
                <nav className="flex mt-15 w-1/4 md:bg-red-950">
                    <div className="md:hidden">
                        <button id="menuBtn" onClick={displayMenu} className="text-white focus:outline-none">
                            &#9776;
                        </button>
                    </div>
                    <ul id="links" className="hidden md:block ml-3 text-left">
                        <li>
                            <Link to='/authors' className="text-blue-500 underline">
                                Authors
                            </Link>
                        </li>
                        <li>
                            <Link to='/works' className="text-blue-500 underline">
                                Works
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex w-3/4">
                    <div className="w-full block">
                        <h1 className="text-xl font-bold ml-auto">Classics Suite</h1>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App