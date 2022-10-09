import React, {useContext} from "react";

import Context from '../../../Context.js';

import "./Pessoas.css";

const Pessoas = () => {

    const {pessoas} = useContext(Context);

    const handlePersonClick = (pessoa) => {
        console.log(pessoa);
    };

    return (
        <div className="panel people">
            <div className="title">Participantes</div>
            <div className="body">
                {pessoas.map((pessoa, key) => (
                    <div className="person" key={key} onClick={() => handlePersonClick(pessoa)}>
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