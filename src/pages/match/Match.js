import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import ReactTooltip from 'react-tooltip';

import {TiArrowBackOutline} from "react-icons/ti";

import Context from '../../Context.js';

import "./Match.css";

const Match = () => {

    useEffect(() => {
        getMatch();
    },[]);

    const {urlApi} = useContext(Context);

    const [match, setMatch] = useState({
        time: '',
        group: '',
        stadium: '',
        homeName: '',
        homeImage: '',
        homeScore: '',
        visitorName: '',
        visitorImage: '',
        visitorScore: ''
    });

    const [people, setPeople] = useState([]);

    const getMatch = () => {
        axios.post(`${urlApi}?action=getMatch&matchId=${new URL(window.location.href).searchParams.get('matchId')}`).then((res) => {
            setMatch({
                time: res.data.time,
                group: res.data.group,
                stadium: res.data.stadium,
                homeName: res.data.homeName,
                homeImage: res.data.homeImage,
                homeScore: res.data.homeScore,
                visitorName: res.data.visitorName,
                visitorImage: res.data.visitorImage,
                visitorScore: res.data.visitorScore
            });
            setPeople(res.data.people);
        }).catch((res) => {
            
        });
    };

    const handlePersonClick = (person) => {
        window.location.href = `/person?personId=${person.personId}`;
    };

    const handleBackClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="data">
            <div className="match">
                <div className="info">GRUPO {match.group} - {match.stadium} - {moment(match.date).format('DD/MM')} {moment(match.date).format('ddd').toUpperCase()} {match.time}</div>
                <div className="score">
                    <div className="left">
                        <img src={`${match.homeImage}`} />
                        <span className="only-desktop-visible">{match.homeName.replace('-',' ').replace('-',' ')}</span>
                        <span className="only-mobile-visible">{match.homeName.substring(0,3)}</span>
                    </div>
                    <div className="center">
                        <span>{match.homeScore}</span><span>x</span><span>{match.visitorScore}</span>
                    </div>
                    <div className="right">
                        <img src={`${match.visitorImage}`} />
                        <span className="only-desktop-visible">{match.visitorName.replace('-',' ').replace('-',' ')}</span>
                        <span className="only-mobile-visible">{match.visitorName.substring(0,3)}</span>                        
                    </div>
                </div>
                <button className="btn btn-back" onClick={() => handleBackClick()}>
                    <TiArrowBackOutline/>
                </button>
            </div>
            <div className="guesses">
                {people.map((person, key) => (
                    <div key={key} className="guess" onClick={() => handlePersonClick(person)}>
                        <div className="info-left" data-tip={person.ruleDescription} style={{backgroundColor: person.ruleColor}}></div>
                        <div className="imagem box-shadow" style={{backgroundImage: `url(${person.image})`}}></div>
                        <div className="nmPessoa">{person.personName}</div>
                        <div className="placar">{person.homeScore} x {person.visitorScore}</div>
                        <div className="info-right" style={{color: person.ruleColor}}>{person.rulePoints} pts</div>
                    </div>
                ))}
            </div>
            <ReactTooltip />
        </div>
    )
}

export default Match;