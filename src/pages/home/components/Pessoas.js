import React, {useEffect, useState, useContext} from "react";

import axios from "axios";

import {BiFootball} from "react-icons/bi";

import Context from '../../../Context.js';

import "./Pessoas.css";

const Pessoas = () => {

    useEffect(() => {
        getPessoas();
    },[]);

    const {token, urlApi, setMatchClass} = useContext(Context);
    const [pessoas, setPessoas] = useState([]);    
    
    const getPessoas = () => {
        axios.post(`${urlApi}?` + new URLSearchParams({
            action: 'getPessoas',
            token: token
        })).then((res) => {
            setPessoas(res.data);
        }).catch((res) => {
            
        });
    };

    const handlePersonClick = (pessoa) => {
        if(pessoa.habilitado){
            window.location.href = '/pessoa?' + new URLSearchParams({
                idPessoa: pessoa.idPessoa,
                token: token
            }).toString();
        }
    };

    const handleButtonTitkeClick = () => {
        setMatchClass('visible');
    };

    return (
        <div className="panel people">
            <div className="title">Participantes<button onClick={() => handleButtonTitkeClick()}><BiFootball/> Jogos</button></div>
            <div className="body">
                {pessoas.map((pessoa, key) => (
                    <div className={`person${pessoa.habilitado ? ' person-hover' : ''}`} key={key} onClick={() => handlePersonClick(pessoa)}>
                        <div className="position">{key+1}</div>
                        <div className="image box-shadow" style={{backgroundImage: `url(${pessoa.imagem})`}}></div>
                        <div className="name">{pessoa.nmPessoa}</div>
                        <div className="hits"><b>{pessoa.acertos}</b><span>act</span></div>
                        <div className="points"><b>{pessoa.pontos}</b><span>pts</span></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pessoas;