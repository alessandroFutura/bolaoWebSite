import React, {useEffect, useState, useContext} from "react";

import Context from '../../../Context.js';

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import {FaTimes} from "react-icons/fa";
import {BsFileEarmarkText} from "react-icons/bs";

import "./Calendar.css";

const Calendar = () => {

    useEffect(() => {
        getCalendar();
    },[]);
    
    const {
        urlApi, 
        matchesClass, 
        setRulesClass, 
        setMatchesClass
    } = useContext(Context);

    const [calendar, setCalendar] = useState([]);

    const getCalendar = () => {
        axios.post(`${urlApi}?action=getCalendar`).then((res) => {
            setCalendar(res.data);
        }).catch((res) => {
            
        });
    };

    const handleMatchClick = (match) => {
        if(match.able){
            window.location.href = `/match?matchId=${match.matchId}`;
        }
    };

    const handleButtonRulesClick = () => {
        setRulesClass('visible');
    };

    const handleButtonCloseClick = () => {
        setMatchesClass('');
    };

    return (
        <div className={`panel calendar ${matchesClass}`}>
            <div className="title">
                Tabela de Jogos
                <button className="only-desktop-visible" onClick={() => handleButtonRulesClick()}>
                    <BsFileEarmarkText/> Regras
                </button>
                <button className="only-mobile-visible" onClick={() => handleButtonCloseClick()}>
                    <FaTimes/> Fechar
                </button>
            </div>
            <div className="body">
                {calendar.map((day, key1) => (
                    <div className="calendar" key={key1}>
                        <div className="day">
                            {moment(day.date).format('DD/MM/YYYY')}
                            <span>{moment(day.date).format('dddd')}</span>
                        </div>
                        <div className="matches">
                            {day.matches.map((match, key2) => (
                                <div className={`match${match.able ? ' match-hover' : ''}`} key={key2} onClick={() => handleMatchClick(match)}>
                                    <div className="info">GRUPO {match.group} - {match.stadium} - {match.time}</div>
                                    <div className="score">
                                        <div className="left">
                                            <img src={`${match.homeImage}`} /><span>{match.homeName.substr(0,3)}</span>
                                        </div>
                                        <div className="center">
                                            <span>{match.homeScore}</span><span>x</span><span>{match.visitorScore}</span>
                                        </div>
                                        <div className="right">
                                            <img src={`${match.visitorImage}`} /><span>{match.visitorName.substr(0,3)}</span>
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

export default Calendar;