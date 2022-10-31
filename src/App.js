import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import axios from "axios";

import moment from 'moment';

import Home from "./pages/home/Home.js";
import Jogo from "./pages/jogo/Jogo.js";
import Pessoa from "./pages/pessoa/Pessoa.js";

import Context from './Context.js';

import './App.css';

function App(){

    useEffect(() => {
        getDataCopa();
    },[]);

    const getDataCopa = () => {
        axios.post('http://localhost/bolaocopa2022/?' + new URLSearchParams({
            action: 'getDataCopa'
        })).then((res) => {
            if(moment(res.data).diff(moment(),'seconds') > 0){
                setContagemRegressiva(getContagemRegressiva(res.data));
                setInterval(() => {            
                    setContagemRegressiva(getContagemRegressiva(res.data));
                }, 1000);
            }
        }).catch((res) => {
            
        });
    };

    const token = new URL(window.location.href).searchParams.get('token') || null;

    const [matchClass, setMatchClass] = useState('');
    const [contagemRegressiva, setContagemRegressiva] = useState('COMEÇOU!!!');

    const getContagemRegressiva = (dataCopa) => {
        let duration = moment.duration(moment(dataCopa).diff(moment().format('YYYY-MM-DD HH:mm:ss')));
        
        let days = parseInt(duration.asDays());
        let hours = parseInt(duration.asHours()) - days * 24;
        let minutes = parseInt(duration.asMinutes()) - (days * 24 * 60) - (hours * 60);
        let seconds = parseInt(duration.asSeconds()) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);        
            
        return `${days} dia${days != 1 ? 's' : ''} ${hours} hora${hours != 1 ? 's' : ''} ${minutes} minuto${minutes != 1 ? 's' : ''} ${seconds} segundo${seconds != 1 ? 's' : ''}`;
    };

    return(
        <Context.Provider value={{token, matchClass, setMatchClass}}>
            <BrowserRouter>
                <h1>Bolão Copa do Mundo Catar 2022<span>{contagemRegressiva}</span></h1>
                <Routes>
                    <Route element={<Home/>} path="/" exact />
                    <Route element={<Jogo/>} path="/jogo" />
                    <Route element={<Pessoa/>} path="/pessoa" />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;