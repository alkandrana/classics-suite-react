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
import VocabForm from "./components/vocab/VocabForm.jsx";
import Login from "./components/account/Login.jsx";
import Register from "./components/account/Register.jsx";
import Profile from "./components/account/Profile.jsx";
import Account from "./components/account/Account.jsx";
import Projects from "./components/account/Projects.jsx";
import VocabList from "./components/account/VocabList.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="account">
                        <Route index element={<Account/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="projects" element={<Projects/>}/>
                        <Route path="vocab" element={<VocabList/>}/>
                    </Route>
                    <Route path="authors">
                        <Route index element={<Authors/>}/>
                        <Route path="add" element={<AuthorAdd/>}/>
                    </Route>
                    <Route path="works" element={<FetchOpus/>}>
                        <Route index element={<Opera/>}/>
                        <Route path="add" element={<OpusAdd/>}/>
                        <Route path=":opusId">
                            <Route index element={<Opus/>}/>
                            <Route path="edit" element={<OpusAdd/>}/>
                        </Route>
                    </Route>
                    <Route path="vocab">
                        <Route path="add" element={<VocabForm/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)