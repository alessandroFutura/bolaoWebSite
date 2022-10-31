import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import moment from 'moment';
import 'moment/locale/pt-br';

import {TiArrowBackOutline} from "react-icons/ti";
import {FaSortAmountUpAlt, FaSortAmountDown} from "react-icons/fa";

import Context from '../../Context.js';

import InputMask from 'react-input-mask';

import "./Pessoa.css";

const Pessoa = () => {
    
    const [pessoa, setPessoa] = useState({});
    const [jogos, setJogos] = useState([]);

    const {token} = useContext(Context);

    const [dataSort, setDataSort] = useState({
        keySortData: 'idJogo',
        typeSortData: 'asc',
        btnSort1Class: 'btn-sort-asc btn-selected',
        btnSort2Class: 'btn-sort-asc'
    });
    
    useEffect(() => {
        getPessoa();
    },[]);

    const getPessoa = () => {
        axios.post('http://localhost/bolaocopa2022/?' + new URLSearchParams({
            action: 'getPessoa',
            token: token,
            idPessoa: new URL(window.location.href).searchParams.get('idPessoa')
        })).then((res) => {
            if(res.data.visivel){
                setPessoa({
                    imagem: res.data.imagem,
                    nmPessoa: res.data.nmPessoa,
                    pontos: res.data.pontos,
                    acertos: res.data.acertos,
                    editavel: res.data.editavel
                });
                setJogos(res.data.jogos);
            } else {
                window.history.go(-1);
            }
        }).catch((res) => {
            
        });
    };

    const saveResultado = (data) => {
        axios.post('http://localhost/bolaocopa2022/?' + new URLSearchParams({
            action: 'saveResultado'            
        }), data).then((res) => {
            let copiaJogos = jogos;
            copiaJogos.forEach((jogo) => {
                if(jogo.idJogo == res.data.idJogo){
                    if(res.data.placarMandante >= 0){
                        jogo.palpitePlacarMandante = res.data.placarMandante
                    }
                    if(res.data.placarVisitante >= 0){
                        jogo.palpitePlacarVisitante = res.data.placarVisitante
                    }
                }
            });
            setJogos(copiaJogos);
        }).catch((res) => {
            
        });
    };

    const handleJogoClick = (jogo) => {
        if(jogo.habilitado){
            window.location.href = `/jogo?idJogo=${jogo.idJogo}`;
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
            btnSort1Class: `btn-sort-${key !== 'idJogo' ? 'asc' : typeSortData} ${key === 'idJogo' ? 'btn-selected' : ''}`,
            btnSort2Class: `btn-sort-${key !== 'qtPontuacao' ? 'asc' : typeSortData} ${key === 'qtPontuacao' ? 'btn-selected' : ''}`
        }); 
    };

    const handleInputChange = (data) => {
        if(Number.isInteger(parseInt(data.placarMandante)) || Number.isInteger(parseInt(data.placarVisitante))){
            data.token = token;
            saveResultado(data);
        }
    };

    const sortData = () => {
        return jogos.sort((a, b) => {
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
        <div className="pessoa">            
            <div className="imagem box-shadow" style={{backgroundImage: `url(${pessoa.imagem})`}}></div>
            <div className="nome">{pessoa.nmPessoa}</div>
            <button className="btn btn-back" onClick={() => handleBackClick()}>
                <TiArrowBackOutline/><span>voltar</span>
            </button>
            <button className={`btn btn-sort btn-sort-pt ${dataSort.btnSort2Class}`} onClick={() => handleSortClick('qtPontuacao')}><FaSortAmountUpAlt/><FaSortAmountDown/><span>pontos</span></button>
            <button className={`btn btn-sort btn-sort-dt ${dataSort.btnSort1Class}`} onClick={() => handleSortClick('idJogo')}><FaSortAmountUpAlt/><FaSortAmountDown/><span>data</span></button>
            <div className="pontos">{pessoa.pontos} pts</div>
            <div className="acertos">{pessoa.acertos} act</div>
            <div className="pessoa-jogos">
                {sortData().map((jogo, key) => (
                    <div className={`pessoa-jogo${jogo.visivel ? ' visivel' : ''}${pessoa.editavel ? ' editavel' : ''}`} key={key} onClick={() => handleJogoClick(jogo)}>
                        <div className="info-left" title={jogo.dsPontuacao} style={{backgroundColor: jogo.corPontuacao}}></div>
                        <div className="info">GRUPO {jogo.grupo} - {jogo.estadio} - {moment(jogo.data).format('DD/MM')} {moment(jogo.data).format('ddd').toUpperCase()} {jogo.horario}</div>
                        <div className="score">
                            <div className="left">
                                <img src={`${jogo.imagemMandante}`} /><span>{jogo.timeMandante.substr(0,3)}</span>
                            </div>
                            <div className="center">
                                <div className="palpite-txt" style={{color: jogo.corPontuacao}}>
                                    ({jogo.palpitePlacarMandante} x {jogo.palpitePlacarVisitante})
                                </div>
                                <div className="palpite-input">
                                    <InputMask 
                                        mask='9'
                                        value={jogo.palpitePlacarMandante || 0} 
                                        onChange={(e) => handleInputChange({
                                            placarMandante: parseInt(e.nativeEvent.data),
                                            idJogo: jogo.idJogo
                                        })}
                                    />
                                    <span>x</span>
                                    <InputMask 
                                        mask='9'
                                        value={jogo.palpitePlacarVisitante || 0} 
                                        onChange={(e) => handleInputChange({
                                            placarVisitante: parseInt(e.nativeEvent.data),
                                            idJogo: jogo.idJogo
                                        })}
                                    />
                                </div>
                                <div className="resultado" >
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