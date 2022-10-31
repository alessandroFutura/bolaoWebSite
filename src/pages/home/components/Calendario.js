import React, {useEffect, useState, useContext} from "react";

import Context from '../../../Context.js';

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import {BsFillPersonLinesFill} from "react-icons/bs";

import "./Calendario.css";

const Calendario = () => {

    useEffect(() => {
        getCalendario();
    },[]);
    
    const [calendario, setCalendario] = useState([]);
    const {matchClass, setMatchClass} = useContext(Context);

    const getCalendario = () => {
        axios.post(`http://localhost/bolaocopa2022/?action=getCalendario`).then((res) => {
            setCalendario(res.data);
        }).catch((res) => {
            
        });
    };

    const handleMatchClick = (jogo) => {
        if(jogo.habilitado){
            window.location.href = `/jogo?idJogo=${jogo.idJogo}`;
        }
    };

    const handleButtonTitkeClick = () => {
        setMatchClass('');
    };

    return (
        <div className={`panel calendar ${matchClass}`}>
            <div className="title">Tabela de Jogos<button onClick={() => handleButtonTitkeClick()}><BsFillPersonLinesFill/> Participantes</button></div>
            <div className="body">
                {calendario.map((dia, key1) => (
                    <div className="calendar" key={key1}>
                        <div className="day">
                            {moment(dia.data).format('DD/MM/YYYY')}
                            <span>{moment(dia.data).format('dddd')}</span>
                        </div>
                        <div className="matches">
                            {dia.jogos.map((jogo, key2) => (
                                <div className={`match${jogo.habilitado ? ' match-hover' : ''}`} key={key2} onClick={() => handleMatchClick(jogo)}>
                                    <div className="info">GRUPO {jogo.grupo} - {jogo.estadio} - {jogo.horario}</div>
                                    <div className="score">
                                        <div className="left">
                                            <img src={`${jogo.imagemMandante}`} /><span>{jogo.timeMandante.substr(0,3)}</span>
                                        </div>
                                        <div className="center">
                                            <span>{jogo.placarMandante}</span><span>x</span><span>{jogo.placarVisitante}</span>
                                        </div>
                                        <div className="right">
                                            <img src={`${jogo.imagemVisitante}`} /><span>{jogo.timeVisitante.substr(0,3)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Calendario;