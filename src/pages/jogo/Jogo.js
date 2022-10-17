import React, {useState, useEffect} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import {TiArrowBackOutline} from "react-icons/ti";

import "./Jogo.css";

const Jogo = () => {

    useEffect(() => {
        getJogo();
    },[]);

    const [jogo, setJogo] = useState({
        grupo: '',
        estadio: '',
        horario: '',
        timeMandante: '',
        timeVisitante: '',
        imagemMandante: '',
        placarMandante: '',
        placarVisitante: '',
        imagemVisitante: '',
    });
    const [pessoas, setPessoas] = useState([]);

    const getJogo = () => {
        axios.post(`http://localhost/bolaocopa2022/?action=getJogo&idJogo=${new URL(window.location.href).searchParams.get('idJogo')}`).then((res) => {
            setJogo({
                grupo: res.data.grupo,
                estadio: res.data.estadio,
                horario: res.data.horario,
                timeMandante: res.data.timeMandante,
                timeVisitante: res.data.timeVisitante,
                imagemMandante: res.data.imagemMandante,
                placarMandante: res.data.placarMandante,
                placarVisitante: res.data.placarVisitante,
                imagemVisitante: res.data.imagemVisitante,
            });
            setPessoas(res.data.pessoas);
        }).catch((res) => {
            
        });
    };

    const handlePessoaClick = (pessoa) => {
        window.location.href = `/pessoa?idPessoa=${pessoa.idPessoa}`;
    };

    const handleBackClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="data">
            <div className="jogo">
                <div className="info">GRUPO {jogo.grupo} - {jogo.estadio} - {moment(jogo.data).format('DD/MM')} {moment(jogo.data).format('ddd').toUpperCase()} {jogo.horario}</div>
                <div className="score">
                    <div className="left">
                        <img src={`${jogo.imagemMandante}`} /><span>{jogo.timeMandante.replace('-',' ').replace('-',' ')}</span>
                    </div>
                    <div className="center">
                        <span>{jogo.placarMandante}</span><span>x</span><span>{jogo.placarVisitante}</span>
                    </div>
                    <div className="right">
                        <img src={`${jogo.imagemVisitante}`} /><span>{jogo.timeVisitante.replace('-',' ').replace('-',' ')}</span>
                    </div>
                </div>
                <button className="btn btn-back" onClick={() => handleBackClick()}>
                    <TiArrowBackOutline/>
                </button>
            </div>
            <div className="palpites">
                {pessoas.map((pessoa, key) => (
                    <div key={key} className="palpite" onClick={() => handlePessoaClick(pessoa)}>
                        <div className="info-left" title={pessoa.dsPontuacao} style={{backgroundColor: pessoa.corPontuacao}}></div>
                        <div className="imagem box-shadow" style={{backgroundImage: `url(${pessoa.imagem})`}}></div>
                        <div className="nmPessoa">{pessoa.nmPessoa}</div>
                        <div className="placar">{pessoa.placarMandante} x {pessoa.placarVisitante}</div>
                        <div className="info-right" style={{color: pessoa.corPontuacao}}>{pessoa.qtPontuacao} pts</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jogo;