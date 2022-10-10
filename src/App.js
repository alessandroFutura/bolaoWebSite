import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/home/Home.js";
import Jogo from "./pages/jogo/Jogo.js";
import Pessoa from "./pages/pessoa/Pessoa.js";

import './App.css';

function App(){
    return(
        <BrowserRouter>
            <h1>Bolão Copa do Mundo Catar 2022</h1>
            <Routes>
                <Route element={<Home/>} path="/" exact />
                <Route element={<Jogo/>} path="/jogo" />
                <Route element={<Pessoa/>} path="/pessoa" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;