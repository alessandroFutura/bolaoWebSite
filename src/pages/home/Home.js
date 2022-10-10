import React from "react";

import Pessoas from "./components/Pessoas.js";
import Calendario from "./components/Calendario.js";

import "./Home.css";

const Home = () => {   
    
    return (
        <div className="home">            
            <Pessoas/>
            <Calendario/>
        </div>
    )

}

export default Home;