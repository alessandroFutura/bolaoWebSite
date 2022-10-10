import React, {useState, useEffect} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import { TiArrowBackOutline } from "react-icons/ti";

import "./Pessoa.css";

const Pessoa = () => {
    
    const [pessoa, setPessoa] = useState({});
    
    useEffect(() => {
        getPessoa();
    },[]);

    const getPessoa = () => {
        axios.post(`http://localhost/bolaocopa2022/?action=getPessoa&idPessoa=${new URL(window.location.href).searchParams.get('idPessoa')}`).then((res) => {
            setPessoa(res.data);
        }).catch((res) => {
            
        });
    };

    const handleJogoClick = (jogo) => {
        window.location.href = `/jogo?idJogo=${jogo.idJogo}`;
    };

    return (
        <div className="pessoa">            
            <div className="imagem box-shadow" style={{backgroundImage: `url(${pessoa.imagem})`}}></div>
            <div className="nome">{pessoa.nmPessoa}</div>
            <button className="btn" onClick={() => {window.history.go(-1)}}><TiArrowBackOutline/></button>
            <div className="pontos">{pessoa.pontos} pts</div>
            <div className="acertos">{pessoa.acertos} act</div>
            <div className="jogos">
                {(pessoa.jogos || []).map((jogo, key) => (
                    <div className="jogo" key={key} style={{backgroundColor: `${jogo.corPontuacao}19`}} onClick={() => handleJogoClick(jogo)}>
                        <div className="info-left" title={jogo.dsPontuacao} style={{backgroundColor: jogo.corPontuacao}}></div>
                        <div className="info">GRUPO {jogo.grupo} - {jogo.estadio} - {moment(jogo.data).format('DD/MM')} {moment(jogo.data).format('ddd').toUpperCase} {jogo.horario}</div>
                        <div className="score">
                            <div className="left">
                                <img src={`${jogo.imagemMandante}`} /><span>{jogo.timeMandante.substr(0,3)}</span>
                            </div>
                            <div className="center">
                                <div className="palpite" style={{color: jogo.corPontuacao}}>
                                    ({jogo.palpitePlacarMandante} x {jogo.palpitePlacarVisitante})
                                </div>
                                <div className="resultado">
                                    <span>{jogo.placarMandante}</span><span>x</span><span>{jogo.placarVisitante}</span>
                                </div>
                            </div>
                            <div className="right">
                                <img src={`${jogo.imagemVisitante}`} /><span>{jogo.timeVisitante.substr(0,3)}</span>
                            </div>
                        </div>
                        <div className="info-right" style={{color: jogo.corPontuacao}}>{jogo.qtPontuacao} pts</div>                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pessoa;