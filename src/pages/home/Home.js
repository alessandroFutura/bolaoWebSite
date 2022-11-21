import React, {useState, useContext} from "react";

import Rules from "./components/Rules.js";
import People from "./components/People.js";
import Calendar from "./components/Calendar.js";

import Context from '../../Context.js';

import "./Home.css";

const Home = () => {

    const {token, urlApi, countDown} = useContext(Context);
    
    const [rulesClass, setRulesClass] = useState('');
    const [matchesClass, setMatchesClass] = useState('');
    
    return (
        <Context.Provider value={{
            token,
            urlApi,
            countDown,
            rulesClass, setRulesClass,
            matchesClass, setMatchesClass
        }}>
            <div className="home">            
                <People/>
                <Calendar/>
                <Rules/>
            </div>
        </Context.Provider>
    )

}

export default Home;