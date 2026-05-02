import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import HomePage from "./components/HomePage.jsx";
import Form from "./components/ui/Form.jsx";
import Table from "./components/ui/Table.jsx";
import Authors from "./components/authors/Authors.jsx";
import Opera from "./components/works/Opera.jsx";
import {OpusForm} from "./components/works/OpusForm.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="authors">
                        <Route index element={<Authors/>}/>
                        <Route path="add" element={<Form/>}/>
                        <Route path=":authorId">
                            <Route path="edit" element={<Form/>}/>
                        </Route>
                    </Route>
                    <Route path="works">
                        <Route index element={<Opera/>}/>
                        <Route path="author">
                            <Route path=":authorId">
                                <Route index element={<Table/>}/>

                            </Route>
                        </Route>
                        <Route path="add" element={<OpusForm/>}/>
                        <Route path=":workId">
                            <Route path="edit" element={<Form/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
