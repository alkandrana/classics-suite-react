import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import HomePage from "./components/HomePage.jsx";
import Authors from "./components/authors/Authors.jsx";
import Opera from "./components/opera/Opera.jsx";
import AuthorAdd from "./components/authors/AuthorAdd.jsx";
import OpusAdd from "./components/opera/OpusAdd.jsx";
import Opus from "./components/opera/Opus.jsx";
import FetchOpus from "./utils/FetchOpus.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/authors">
                        <Route index element={<Authors/>}/>
                        <Route path="add" element={<AuthorAdd/>}/>
                    </Route>
                    <Route path="/works" element={<FetchOpus/>}>
                        <Route index element={<Opera/>}/>
                        <Route path="add" element={<OpusAdd/>}/>
                        <Route path=":opusId">
                            <Route index element={<Opus/>}/>
                            <Route path="edit" element={<OpusAdd/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)