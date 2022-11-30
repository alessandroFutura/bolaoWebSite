import React, {useEffect, useState, useContext} from "react";

import Context from '../../../Context.js';

import {FaTimes} from "react-icons/fa";

import axios from "axios";

import "./Rules.css";

const Rules = () => {

    useEffect(() => {
        getRules();
    },[]);

    const {
        urlApi,
        rulesClass, 
        setRulesClass
    } = useContext(Context);

    const [rules, setRules] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [ticketValue, setTicketValue] = useState(0);
    const [expenseValue, setExpenseValue] = useState(0);
    const [totalPrizeValue, setTotalPrizeValue] = useState(0);
    const [totalParticipants, setTotalParticipants] = useState(0);
    const [betText, setBetText] = useState('');
    const [tieText, setTieText] = useState('');

    const getRules = () => {
        axios.post(`${urlApi}?action=getRules`).then((res) => {
            setRules(res.data.rules);
            setPrizes(res.data.prizes);
            setBetText(res.data.betText);
            setTieText(res.data.tieText);
            setTicketValue(res.data.ticketValue);
            setExpenseValue(res.data.expenseValue);
            setTotalPrizeValue(res.data.totalPrizeValue);
            setTotalParticipants(res.data.totalParticipants);
        }).catch((res) => {
            
        });
    };

    const handleButtonCloseClick = () => {
        setRulesClass('');
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
        <div className={`panel rules ${rulesClass}`}>
            <div className="title">
                Regras
                <button onClick={() => handleButtonCloseClick()}>
                    <FaTimes/> Fechar
                </button>
            </div>
            <div className="body">
                <div className="info">
                    <h5>Pontuação</h5>
                    {rules.map((rule, key) => (
                        <div className="rule" key={key}>
                            <label style={{backgroundColor: rule.ruleColor}}></label>
                            <b>{rule.rulePoints} pts</b> - {rule.ruleDescription}
                            <span>{rule.ruleExample}</span>
                        </div>
                    ))}
                </div>             
                <div className="info">
                    <h5>Premiação</h5>
                    Total de participantes: <b>{totalParticipants}</b><br/>
                    Valor por participante: <b>R$ {numberFormat({value: ticketValue})}</b><br/>
                    Custo de manutenção: <b>R$ {numberFormat({value: expenseValue})}</b><br/>
                    Valor total da premiação: <b>R$ {numberFormat({value: totalPrizeValue})}</b><br/>
                    <div className="prizes">
                        {prizes.map((prize, key) => (
                            <div className="prize" key={key}>
                                Premiação para o {key+1} º Colocado: <b>R$ {numberFormat({value: prize.prizeValue})}</b><br/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="info">              
                    <h5>Apostas</h5>
                    <div dangerouslySetInnerHTML={{__html: betText}}></div>
                </div>
                <div className="info">              
                    <h5>Empate</h5>
                    <div dangerouslySetInnerHTML={{__html: tieText}}></div>
                </div>
            </div>
        </div>
    )
}

export default Rules;