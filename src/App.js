import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/home/Home.js";
import Jogo from "./pages/Jogo.js";
import Pessoa from "./pages/Pessoa.js";

import './App.css';

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Home/>} path="/" exact />
                <Route element={<Jogo/>} path="/jogo" />
                <Route element={<Pessoa/>} path="/pessoa" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;