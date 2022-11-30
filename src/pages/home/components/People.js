import React, {useEffect, useState, useContext} from "react";

import Context from '../../../Context.js';

import {BiFootball} from "react-icons/bi";
import {BsFileEarmarkText} from "react-icons/bs";

import axios from "axios";

import "./People.css";

const People = () => {

    useEffect(() => {
        getPeople();
    },[]);

    const {
        token, 
        urlApi,
        countDown,
        setRulesClass,
        setMatchesClass
    } = useContext(Context);

    const [people, setPeople] = useState([]);    
    
    const getPeople = () => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'getPeople',
            token: token
        })).then((res) => {
            setPeople(res.data);
        }).catch((res) => {
            
        });
    };

    const handlePersonClick = (person) => {
        if(person.able){
            window.location.href = '/person?' + new URLSearchParams({
                personId: person.personId,
                token: token
            }).toString();
        }
    };

    const handleButtonRulesClick = () => {
        setRulesClass('visible');
    };

    const handleButtonMatchesClick = () => {
        console.log(token,countDown);
        if(!!token && !!countDown){
            window.document.getElementsByClassName('person-amI')[0].click();
            setTimeout(() => setMatchesClass('visible'), 1000);
        } else {
            setMatchesClass('visible');
        }        
    };

    return (
        <div className="panel people">
            <div className="title">
                Participantes ({people.length})
                <button className="only-mobile-visible" onClick={() => handleButtonRulesClick()}>
                    <BsFileEarmarkText/> Regras
                </button>
                <button className="only-mobile-visible" onClick={() => handleButtonMatchesClick()}>
                    <BiFootball/> Jogos
                </button>
            </div>
            <div className="body">
                {people.map((person, key) => (
                    <div className={`person${person.able ? ' person-hover' : ''}${person.amI ? ' person-amI' : ''} podium-${person.position}`} key={key} onClick={() => handlePersonClick(person)}>
                        <div className="position">{person.position}</div>
                        <div className="image box-shadow" style={{backgroundImage: `url(${person.image})`}}></div>
                        <div className="name">{person.personName}</div>
                        <div className="hits"><b>{person.hits}</b><span>act</span></div>
                        <div className="points"><b>{person.points}</b><span>pts</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default People;