import {useEffect, useState, useRef} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import axios from "axios";
import moment from 'moment';

import Home from "./pages/home/Home.js";
import Match from "./pages/match/Match.js";
import Person from "./pages/person/Person.js";
import Result from "./pages/result/Result.js";

import Context from './Context.js';

import './App.css';

function App(){

    useEffect(() => {
        getCupDate();
    },[]);

    const urlApi = `http://${window.location.hostname}/bolao/api/`;
    const token = new URL(window.location.href).searchParams.get('token') || null;

    const timer = useRef(null);
    const [countDown, setCountDown] = useState('');

    const getCupDate = () => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'getCupDate'
        })).then((res) => {
            if(moment(res.data).diff(moment(),'seconds') > 0){
                setCountDown(getCountDown(res.data));
                if(timer.current !== null) clearInterval(timer.current);
                timer.current = setInterval(() => {            
                    setCountDown(getCountDown(res.data));
                }, 1000);
            }
        }).catch((res) => {
            
        });
    };

    const getCountDown = (cupDate) => {
        let duration = moment.duration(moment(cupDate).diff(moment().format('YYYY-MM-DD HH:mm:ss')));        
        let days = parseInt(duration.asDays());
        let hours = parseInt(duration.asHours()) - days * 24;
        let minutes = parseInt(duration.asMinutes()) - (days * 24 * 60) - (hours * 60);
        let seconds = parseInt(duration.asSeconds()) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);        
        return `${days} dia${days != 1 ? 's' : ''} ${hours} hora${hours != 1 ? 's' : ''} ${minutes} minuto${minutes != 1 ? 's' : ''} ${seconds} segundo${seconds != 1 ? 's' : ''}`;
    };

    return(
        <Context.Provider value={{token, urlApi, countDown}}>
            <BrowserRouter basename="/">
                <h1 className={`${countDown === '' ? 'none' : ''}`}>Fifa World Cup Qatar 2022<span>{countDown}</span></h1>
                <Routes>
                    <Route element={<Home/>} path="/" exact />
                    <Route element={<Match/>} path="/match" />
                    <Route element={<Person/>} path="/person" />
                    <Route element={<Result/>} path="/result" />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;