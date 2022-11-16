import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import ReactTooltip from 'react-tooltip';

import {TiArrowBackOutline} from "react-icons/ti";
import {FaSortAmountUpAlt, FaSortAmountDown} from "react-icons/fa";

import Context from '../../Context.js';

import InputMask from 'react-input-mask';

import "./Person.css";

const Person = () => {
    
    const [person, setPerson] = useState({});
    const [matches, setMatches] = useState([]);

    const {token, urlApi} = useContext(Context);

    const [dataSort, setDataSort] = useState({
        keySortData: 'matchId',
        typeSortData: 'asc',
        btnSort1Class: 'btn-sort-asc btn-selected',
        btnSort2Class: 'btn-sort-asc'
    });
    
    useEffect(() => {
        getPerson();
    },[]);

    const getPerson = () => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'getPerson',
            token: token,
            personId: new URL(window.location.href).searchParams.get('personId')
        })).then((res) => {
            if(res.data.visible){
                setPerson({
                    image: res.data.image,
                    personName: res.data.personName,
                    points: res.data.points,
                    hits: res.data.hits,
                    visible: res.data.visible,
                    editable: res.data.editable
                });
                setMatches(res.data.matches);
            } else {
                window.history.go(-1);
            }
        }).catch((res) => {
            
        });
    };

    const saveScore = (data) => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'saveScore'            
        }), data).then((res) => {
            let matchesCopy = matches;
            matchesCopy.forEach((match) => {
                if(match.matchId == res.data.matchId){
                    if(res.data.homeScore >= 0){
                        match.guessHomeScore = res.data.homeScore
                    }
                    if(res.data.visitorScore >= 0){
                        match.guessVisitorScore = res.data.visitorScore
                    }
                }
            });
            setMatches(matchesCopy);
        }).catch((res) => {
            
        });
    };

    const handleMatchClick = (match) => {
        if(match.visible){
            window.location.href = `/match?matchId=${match.matchId}`;
        }
    };

    const handleBackClick = () => {
        window.history.go(-1);
    };

    const handleSortClick = (key) => {
        let typeSortData = key === dataSort.keySortData ? (dataSort.typeSortData === 'asc' ? 'desc' : 'asc') : 'asc';
        setDataSort({
            keySortData: key,
            typeSortData: typeSortData,
            btnSort1Class: `btn-sort-${key !== 'matchId' ? 'asc' : typeSortData} ${key === 'matchId' ? 'btn-selected' : ''}`,
            btnSort2Class: `btn-sort-${key !== 'rulePoints' ? 'asc' : typeSortData} ${key === 'rulePoints' ? 'btn-selected' : ''}`
        }); 
    };

    const handleInputChange = (data) => {
        if(Number.isInteger(parseInt(data.homeScore)) || Number.isInteger(parseInt(data.visitorScore))){
            data.token = token;
            saveScore(data);
        }
    };

    const sortData = () => {
        return matches.sort((a, b) => {
            let x = a[dataSort.keySortData];
            let y = b[dataSort.keySortData];
            if(dataSort.typeSortData === 'asc'){
                return x - y;
            } else {
                return y - x;
            }
        });
    };

    return (
        <div className="person-page">          
            <div className="image box-shadow" style={{backgroundImage: `url(${person.image})`}}></div>
            <div className="name">{person.personName}</div>
            <button className="btn btn-back" onClick={() => handleBackClick()}>
                <TiArrowBackOutline/><span>voltar</span>
            </button>
            <button disabled={person.editable} className={`btn btn-sort btn-sort-pt ${dataSort.btnSort2Class}`} onClick={() => handleSortClick('rulePoints')}><FaSortAmountUpAlt/><FaSortAmountDown/><span>pontos</span></button>
            <button disabled={person.editable} className={`btn btn-sort btn-sort-dt ${dataSort.btnSort1Class}`} onClick={() => handleSortClick('matchId')}><FaSortAmountUpAlt/><FaSortAmountDown/><span>data</span></button>
            <div className="points">{person.points} pts</div>
            <div className="hits">{person.hits} act</div>
            <div className="matches">
                {sortData().map((match, key) => (
                    <div className={`match${match.visible ? ' visible' : ''}${person.editable ? ' editable' : ''}`} key={key} onClick={() => handleMatchClick(match)}>
                        <div className="info-left" data-tip={match.ruleDescription} style={{backgroundColor: match.ruleColor}}></div>
                        <div className="info">GRUPO {match.group} - {match.stadium} - {moment(match.date).format('DD/MM')} {moment(match.date).format('ddd').toUpperCase()} {match.time}</div>
                        <div className="score">
                            <div className="left">
                                <img src={`${match.homeImage}`} /><span>{match.homeName.substr(0,3)}</span>
                            </div>
                            <div className="center">
                                <div className="guess-txt" style={{color: match.ruleColor}}>
                                    ({match.guessHomeScore} x {match.guessVisitorScore})
                                </div>
                                <div className="guess-input">
                                    <InputMask 
                                        mask='9'
                                        type='tel'
                                        value={match.guessHomeScore || 0} 
                                        onFocus={(e) => e.target.select()}
                                        onChange={(e) => handleInputChange({
                                            homeScore: parseInt(e.nativeEvent.data),
                                            matchId: match.matchId
                                        })}
                                    />
                                    <span>x</span>
                                    <InputMask 
                                        mask='9'
                                        type='tel'
                                        value={match.guessVisitorScore || 0} 
                                        onFocus={(e) => e.target.select()}
                                        onChange={(e) => handleInputChange({
                                            visitorScore: parseInt(e.nativeEvent.data),
                                            matchId: match.matchId
                                        })}
                                    />
                                </div>
                                <div className="result" >
                                    <span>{match.homeScore}</span><span>x</span><span>{match.visitorScore}</span>
                                </div>
                            </div>
                            <div className="right">
                                <img src={`${match.visitorImage}`} /><span>{match.visitorName.substr(0,3)}</span>
                            </div>
                        </div>
                        <div className="info-right" style={{color: match.ruleColor}}>{match.rulePoints} pts</div>                        
                    </div>
                ))}
            </div>
            <ReactTooltip />
        </div>
    )
}

export default Person;