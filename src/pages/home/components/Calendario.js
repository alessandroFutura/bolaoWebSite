import React, {useContext} from "react";

import Context from '../../../Context.js';

import moment from 'moment';
import 'moment/locale/pt-br';

import "./Calendario.css";

const Calendario = () => {

    const {calendario} = useContext(Context);

    const handleMatchClick = (match) => {
        console.log(match);
    };

    return (
        <div className="panel calendar">
            <div className="title">Tabela de Jogos</div>
            <div className="body">
                {calendario.map((dia, key1) => (
                    <div className="calendar" key={key1}>
                        <div className="day">
                            {moment(dia.data).format('DD/MM/YYYY')}
                            <span>{moment(dia.data).format('dddd')}</span>
                        </div>
                        <div className="matches">
                            {dia.jogos.map((jogo, key2) => (
                                <div className="match" key={key2} onClick={() => handleMatchClick(jogo)}>
                                    <div className="info">GRUPO {jogo.grupo} - {jogo.estadio} - {jogo.horario}</div>
                                    <div className="score">
                                        <div className="left">
                                            <img src={`${jogo.imagemMandante}`} /><span>{jogo.timeMandante.substr(0,3)}</span>
                                        </div>
                                        <div className="center">
                                            <span>{jogo.placarMandante}</span><span>x</span><span>{jogo.placarVisitante}</span>
                                        </div>
                                        <div className="right">
                                            <img src={`${jogo.imagemVisitante}`} /><span>{jogo.timeVisitante.substr(0,3)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendario;