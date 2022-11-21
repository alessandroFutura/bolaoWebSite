import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import {TiArrowBackOutline} from "react-icons/ti";

import Context from '../../Context.js';

import "./Match.css";

const Match = () => {

    useEffect(() => {
        getMatch();
    },[]);

    const maxWidht = window.innerWidth > 700 ? 7 : 22;

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
                homeColor: res.data.homeColor,
                homeImage: res.data.homeImage,
                homeScore: res.data.homeScore,
                homePercent: res.data.homePercent,
                homeVictories: res.data.homeVictories,
                visitorName: res.data.visitorName,
                visitorColor: res.data.visitorColor,
                visitorImage: res.data.visitorImage,
                visitorScore: res.data.visitorScore,
                visitorPercent: res.data.visitorPercent,
                visitorVictories: res.data.visitorVictories,
                equalityPercent: res.data.equalityPercent,
                equalities: res.data.equalities,
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

    const numberFormat = (params) => {
        let options = {
            locale: 'pt-BR',
            minimumFractionDigits: (typeof params.minDecimals === 'undefined' ? 2 : params.minDecimals),
            maximumFractionDigits: (typeof params.maxDecimals === 'undefined' ? 2 : params.maxDecimals)
        };
        if(!!params.style){
            options.style = params.style;
        }
        if(!!params.currency){
            options.currency = params.currency;
        }
        if(params.style === 'percent'){
            params.value = parseFloat(params.value || 0)/100;
        }
        return parseFloat(params.value).toLocaleString((params.locale || 'pt-BR'), options);
    }

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
                    <div className="percents">
                        <div className="homePercent" style={{backgroundColor:match.homeColor, width:`${match.homePercent}%`}}>
                            <span style={{visibility: match.homePercent > maxWidht ? 'visible' : 'hidden'}}>({match.homeVictories}) {numberFormat({value:match.homePercent})}%</span>                         
                        </div>
                        <div className="equalityPercent" style={{width: `${match.equalityPercent}%`}}>
                            <span style={{visibility: match.equalityPercent > maxWidht ? 'visible' : 'hidden'}}>({match.equalities}) {numberFormat({value:match.equalityPercent})}%</span>
                        </div>
                        <div className="visitorPercent" style={{backgroundColor: match.visitorColor, width: `${match.visitorPercent}%`}}>
                            <span style={{visibility: match.visitorPercent > maxWidht ? 'visible' : 'hidden'}}>({match.visitorVictories}) {numberFormat({value:match.visitorPercent})}%</span>
                        </div>
                    </div>
                </div>
                <button className="btn btn-back" onClick={() => handleBackClick()}>
                    <TiArrowBackOutline/>
                </button>
            </div>
            <div className="guesses">
                {people.map((person, key) => (
                    <div key={key} className="guess" onClick={() => handlePersonClick(person)}>
                        <div className="person">
                            <div className="imagem box-shadow" style={{backgroundImage: `url(${person.image})`}}></div>
                            <div className="nmPessoa">{person.personName}</div>
                            <div className="placar">{person.homeScore} x {person.visitorScore}</div>
                            <div className="ruleDescription" style={{color: person.ruleColor}}>{person.ruleDescription}</div>
                        </div>                        
                        <div className="info-left" data-for={`data-tip-${key}`} data-tip={person.ruleDescription} style={{backgroundColor: person.ruleColor}}></div>
                        <div className="info-right" style={{color: person.ruleColor}}>{person.rulePoints} pts</div>
                    </div>                    
                ))}
            </div>            
        </div>
    )
}

export default Match;