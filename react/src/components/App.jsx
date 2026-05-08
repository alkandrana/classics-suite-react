import {Link, Outlet} from 'react-router-dom';

function App() {
    return (
        <div id="main">
            <div className="flex flex-row">
                <nav className="hidden md:flex pt-15 w-1/4 bg-red-950">
                    <ul>
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

                <div className="flex ml-20">
                    <div>
                        <h1 className="text-xl font-bold ml-auto">Classics Suite</h1>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App