import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import HomePage from "./components/HomePage.jsx";
import AddAuthor from './components/AddAuthor.jsx';
import AddOpus from './components/opus/AddOpus.jsx';
import Opus from './components/opus/Opus.jsx';
import Study from './components/Study.jsx';
import Register from './components/account/Register.jsx'
import Login from './components/account/Login.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='account'>
                        <Route path="register" element={<Register/>}/>
                        <Route path="login" element={<Login/>} />
                    </Route>
                    <Route path="author">
                        <Route path="add" element={<AddAuthor />} />
                    </Route>
                    <Route path="work">
                        <Route path=":workId" element={<Opus />} />
                        <Route path="add" element={<AddOpus />} />
                    </Route>
                    <Route path="study" >
                        <Route path=":workId" element={<Study/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
