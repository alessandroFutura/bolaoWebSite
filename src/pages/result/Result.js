import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import Context from '../../Context.js';

import InputMask from 'react-input-mask';

import "./Result.css";

const Result = () => {

    useEffect(() => {
        getMatches();
    },[]);    
    
    const [matches, setMatches] = useState([]);    
    const {token, urlApi} = useContext(Context);

    const getMatches = () => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'getMatches',
            token: token
        })).then((res) => {
            setMatches(res.data);
        }).catch((res) => {
            
        });
    };

    const saveResult = (data) => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'saveResult'            
        }), data).then((res) => {
            let copy = [];
            [].concat(matches).forEach((match) => {
                if(match.matchId == res.data.matchId){
                    if(typeof res.data.homeScore !== 'undefined'){
                        match.homeScore = res.data.homeScore
                    }
                    if(typeof res.data.visitorScore !== 'undefined'){
                        match.visitorScore = res.data.visitorScore
                    }
                }
                copy.push(match);
            });
            setMatches(copy);
        }).catch((res) => {
            
        });
    };

    const handleInputChange = (data) => {
        data.token = token;
        saveResult(data);
    };

    return (        
        <div className="results">
            {matches.map((match, key) => (
                <div className="match" key={key}>
                    <div className="info">GRUPO {match.group} - {match.stadium} - {moment(match.date).format('DD/MM')} {moment(match.date).format('ddd').toUpperCase()} {match.time}</div>
                    <div className="score">
                        <div className="left">
                            <img src={`${match.homeImage}`} /><span>{match.homeName.substr(0,3)}</span>
                        </div>
                        <div className="center">                            
                            <div className="guess-input">
                                <InputMask 
                                    mask='9'
                                    type='tel'
                                    value={match.homeScore}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => handleInputChange({
                                        homeScore: e.nativeEvent.data || '',
                                        matchId: match.matchId
                                    })}
                                />
                                <span>x</span>
                                <InputMask 
                                    mask='9'
                                    type='tel'
                                    value={match.visitorScore} 
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => handleInputChange({
                                        visitorScore: e.nativeEvent.data || '',
                                        matchId: match.matchId
                                    })}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <img src={`${match.visitorImage}`} /><span>{match.visitorName.substr(0,3)}</span>
                        </div>
                    </div>                       
                </div>
            ))}
        </div>
    )
}

export default Result;