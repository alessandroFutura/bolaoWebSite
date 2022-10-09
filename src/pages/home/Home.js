import React, {useState, useEffect} from "react";

import axios from "axios";

import Context from '../../Context.js';
import Pessoas from "./components/Pessoas.js";
import Calendario from "./components/Calendario.js";

import "./Home.css";

const Home = () => {
    
    const [pessoas, setPessoas] = useState([]);
    const [calendario, setCalendario] = useState([]);

    useEffect(() => {
        getData();
    },[]);
    
    const getData = () => {
        axios.post(`http://localhost/bolaocopa2022/api/home.php`).then((res) => {
            setPessoas(res.data.pessoas);
            setCalendario(res.data.calendario);
        }).catch((res) => {
            
        });
    };

    return (
        <Context.Provider value={{pessoas, calendario}}>
            <div className="home">            
                <h1>Bolão Copa do Mundo Catar 2022</h1>
                <Pessoas/>
                <Calendario/>
            </div>
        </Context.Provider>
    )
}

export default Home;